"use client"

import { useAuth } from "@/app/providers/AuthProvider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RegisterAndAddNewMemberToOrg from "@/hooks/Functions/RegisterAndAddNewMemberToOrg"
import organizationStore from "@/store/organizationStore"
import workspaceStore from "@/store/workspaceStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useStore } from "zustand"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  contactNo: z.string().min(10, {
    message: "Contact number must be at least 10 digits.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  // workspace
  workspaceId: z.string().optional(),
  department: z.string().optional(),
  role: z.string().optional(),
  jobTitle: z.string().optional(),
})
interface InviteMemberDialogProps {
    trigger?: React.ReactNode;
  }
export default function RegisterUserDialog({ trigger }: InviteMemberDialogProps) {
  const queryClient = useQueryClient();
  const {session} = useAuth()
  const [open, setOpen] = useState(false)
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace);
  const activeOrganization = useStore(
    organizationStore,
    (state) => state.activeOrganization
  );
  const RegisterNewUser = useMutation({
    mutationFn: RegisterAndAddNewMemberToOrg,
    onSuccess: () => {
      toast.success( "User registered and added successfully.");
      queryClient.invalidateQueries({ queryKey: ["my-org"] });
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to register and add user.");
    },
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      location: "",
      contactNo: "",
      role:"member",
      jobTitle: "",
      department: "",
      workspaceId: "",
    },
  })
  const isWorkspaceSelected = form.watch("workspaceId");
  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      contactNo: values.contactNo,
      location: values.location,
      organizationId: activeOrganization?.id,
      // if the owner adds a new member to the organization & workspace the below fields are used
      workspaceId: values.workspaceId || "",
      role: values.role || "",
      jobTitle: values.jobTitle || "",
      departmentId: values.department || "",
    }
    RegisterNewUser.mutate(payload)
    // Here you would typically send the data to your backend
  }
  console.log(form.formState.errors)
  return (
    <Dialog open={open} onOpenChange={(open) =>{ setOpen(open)
      form.reset()
    }}>
      <DialogTrigger asChild>
      {trigger || <Button variant="outline">Register User</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Registration</DialogTitle>
          <DialogDescription>Enter user details to create a new account.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} required placeholder="Enter password"/>
                    </FormControl>
                    <FormDescription>Password must be at least 8 characters.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} required/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} required/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="workspaceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a workspace" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activeOrganization?.workspaces?.map((workspace) => (
                        <SelectItem key={workspace.id} value={workspace.id}>
                          {workspace.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isWorkspaceSelected && ( <>
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job title" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a department"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activeWorkspace?.departments?.map((department) => (
                        <SelectItem key={department.id} value={department.id}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div></>)}
            <DialogFooter>
              <Button type="submit">Register</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
