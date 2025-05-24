"use client"

import type React from "react"

import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/app/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import AddNewDepartment from "@/hooks/Functions/AddNewDepartment";

interface AddDepartmentDialogProps {
  trigger?: React.ReactNode
  workspaceid: string
}

export function AddDepartmentDialog({trigger, workspaceid }: AddDepartmentDialogProps) {
  const [departmentName, setDepartmentName] = useState("")
  const { session } = useAuth();
  const queryClient = useQueryClient();

  const AddNewDepartmentMutation = useMutation({
    mutationFn: AddNewDepartment,
    onSuccess: () => {
      // setOpen(false);
      toast.success("Department added successfully");
      queryClient.invalidateQueries({
        queryKey: ["workspace-by-id", workspaceid],
      });
      setDepartmentName("");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error adding department");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate
    if (!departmentName.trim()) {
      alert("Department name is required")
      return
    }

    // Add department
    AddNewDepartmentMutation.mutate({
      workspaceId: workspaceid,
      name: departmentName,
    });

    // Reset form
    setDepartmentName("")
  }




  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button size="sm">Add Department</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Department</DialogTitle>
            <DialogDescription>Create a new department for your workspace.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="departmentName">Department Name</Label>
              <Input
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="Enter department name"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() =>{}}>
              Cancel
            </Button>
            <Button type="submit" disabled={AddNewDepartmentMutation.isPending}>
              {AddNewDepartmentMutation.isPending ? "Creating..." : "Create Department"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
