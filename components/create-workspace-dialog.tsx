"use client";

import type React from "react";

import { useAuth } from "@/app/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AddNewDepartment from "@/hooks/Functions/AddNewDepartment";
import CreateNewWorkspace from "@/hooks/Functions/CreateNewWorkspace";
import workspaceStore from "@/store/workspaceStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useStore } from "zustand";
import { Badge } from "./ui/badge";
import { icons } from "./workspace-switcher";

interface CreateWorkspaceDialogProps {
  trigger?: React.ReactNode;
}

export function CreateWorkspaceDialog({ trigger }: CreateWorkspaceDialogProps) {
  const {session} = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workspaceType, setWorkspaceType] = useState("team");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [inviteEmails, setInviteEmails] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [icon, setIcon] = useState("AudioWaveform");
  const [departmentName, setDepartmentName] = useState("");

  const setActiveWorkspace = useStore(workspaceStore,(state) => state.setActiveWorkspace);
  const activeWorkspace = useStore(workspaceStore,(state) => state.activeWorkspace);

  // // Handle file upload for logo
  // const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setLogoPreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle workspace creation logic here
    // Reset form and close dialog
    setName("");
    setDescription("");
    setWorkspaceType("team");
    setLogoPreview(null);
    setInviteEmails("");
    setTemplateId("");
    setStep(1);
    setOpen(false);
  };

  // Go to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  const CreateNewWorkspaceMutation = useMutation({
    mutationFn: CreateNewWorkspace,
    onSuccess: (response) => {
      setActiveWorkspace(response?.data);
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["my-org"],
      });
      nextStep();
    },
    onError: (error: {response: {data: {message: string}}}) => {
      toast.error(error?.response?.data?.message );
    },
  });

  const handleCreateWorkspace = () => {
    CreateNewWorkspaceMutation.mutate({
      name,
      description,
      icon,
      ownerId: session.id,
      organizationId: session?.organizationId,
    });
  }

  const AddNewDepartmentMutation = useMutation({
    mutationFn: AddNewDepartment,
    onSuccess: (response) => {
      // setOpen(false);
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["workspaces", session?.id],
      });
      setDepartmentName("");
    },
    onError: (error: {response: {data: {message: string}}}) => {
      toast.error(error?.response?.data?.message );
    },
  });

  const handleAddDepartment = () => {
    AddNewDepartmentMutation.mutate({
      workspaceId: activeWorkspace.id!,
      name: departmentName,
    });
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full justify-start gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Workspace
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div>
          <DialogHeader>
            <DialogTitle>Create New Workspace</DialogTitle>
            <DialogDescription>
              Set up a new workspace for your team to collaborate on projects.
            </DialogDescription>
          </DialogHeader>

          {/* Step indicators */}
          <div className="my-4 flex items-center justify-center">
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <div
                className={`h-1 w-10 ${step >= 2 ? "bg-primary" : "bg-muted"}`}
              ></div>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 2
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <div
                className={`h-1 w-10 ${step >= 3 ? "bg-primary" : "bg-muted"}`}
              ></div>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 3
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="grid gap-1 py-4">
              <div className="flex flex-col items-center">
                  <Label className="mb-5">Choose icon for your workspace</Label>
                  <div className="grid grid-cols-3 gap-4 w-full sm:w-1/2 mx-auto sm:grid-cols-5">
                    {icons.map((Icon, index) => (
                      <div key={index} className="flex items-center justify-center ">
                        <Icon.icon className={`h-10 w-10 cursor-pointer hover:scale-110 p-2 rounded-lg ${icon === Icon.label ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`} onClick={() => setIcon(Icon.label)} />
                      </div>
                    ))}
                  </div>
                </div>
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                {/* <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted">
                    {logoPreview ? (
                      <div className="h-full w-full overflow-hidden rounded-md">
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Workspace logo preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleLogoChange}
                  />
                  <Label
                    htmlFor="logo-upload"
                    className="absolute -bottom-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground"
                  >
                    +
                  </Label>
                </div> */}
                
                <div className="grid w-full gap-2">
                  <Label htmlFor="workspace-name">Workspace Name</Label>
                  <Input
                    id="workspace-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter workspace name"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="workspace-description">Description</Label>
                <Textarea
                  id="workspace-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the purpose of this workspace"
                  className="min-h-[100px]"
                />
              </div>

              {/* <div className="grid gap-2">
                <Label htmlFor="workspace-type">Workspace Type</Label>
                <Select value={workspaceType} onValueChange={setWorkspaceType}>
                  <SelectTrigger id="workspace-type">
                    <SelectValue placeholder="Select workspace type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="team">Team Workspace</SelectItem>
                    <SelectItem value="personal">Personal Workspace</SelectItem>
                    <SelectItem value="client">Client Workspace</SelectItem>
                    <SelectItem value="project">Project Workspace</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
              <DialogFooter className="mt-6">
              <Button type="button" onClick={handleCreateWorkspace}>
                Save & Continue
              </Button>
          </DialogFooter>
            </div>
          )}

          {/* Step 2: Choose Template */}
          {step === 2 && (
            <div className="grid gap-4 py-4">
              <Label>Departments</Label>
              <div className="flex flex-wrap gap-2">
                {activeWorkspace.departments && activeWorkspace.departments.map((department) => (
                  <Badge key={department.id} className="py-1 px-2 rounded-full">
                    {department.name}
                  </Badge>
                ))}
              </div>
              <div className="grid gap-2">
                <Label>Add New Department</Label>
                <Input placeholder="Add New Department" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
              </div>
              <DialogFooter className="mt-6">
              <Button type="button" onClick={handleAddDepartment} disabled={departmentName === ""}>
                Save & Continue
              </Button>
          </DialogFooter>
            </div>
          )}

          {/* Step 3: Invite Team Members */}
          {step === 3 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="invite-emails">
                  Invite Team Members (Optional)
                </Label>
                <Textarea
                  id="invite-emails"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  placeholder="Enter email addresses (one per line or separated by commas)"
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                  Enter multiple email addresses separated by commas or on new
                  lines.
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Default Role for Invitees</Label>
                <Select defaultValue="member">
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 rounded-md bg-muted/50 p-3">
                <h4 className="font-medium">
                  You'll be able to invite more people later
                </h4>
                <p className="text-sm text-muted-foreground">
                  You can always add more team members after creating your
                  workspace.
                </p>
              </div>
            </div>
          )}

          {/* <DialogFooter className="mt-6">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={nextStep}>
                Continue
              </Button>
            ) : (
              <Button type="button">Create Workspace</Button>
            )}
          </DialogFooter> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
