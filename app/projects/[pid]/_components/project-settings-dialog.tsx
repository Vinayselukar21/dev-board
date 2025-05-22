"use client";

import type React from "react";

import { Project } from "@/app/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddMemberToProject from "@/hooks/Functions/AddMemberToProject";
import AddNewProjectStage from "@/hooks/Functions/AddNewProjectStage";
import workspaceStore from "@/store/workspaceStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useStore } from "zustand";

interface ProjectSettingsDialogProps {
  projectId: string;
  projectTaskData: Project | null;
  trigger?: React.ReactNode;
}

export function ProjectSettingsDialog({
  projectId,
  projectTaskData,
  trigger,
}: ProjectSettingsDialogProps) {
  const queryClient = useQueryClient();
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace);
  const [open, setOpen] = useState(false);
  // Find the current project from the workspace
  const currentProject = projectTaskData || null;
  // Project settings state
  const [name, setName] = useState(currentProject?.name || "");
  const [description, setDescription] = useState(
    currentProject?.description || ""
  );
  const [category, setCategory] = useState("development");
  const [dueDate, setDueDate] = useState<Date | undefined>(
    new Date(currentProject?.deadline || new Date())
  );
  const [status, setStatus] = useState(currentProject?.status || "");

  const [columns, setColumns] = useState(currentProject?.taskStages || []);
  const [newColumnName, setNewColumnName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    currentProject?.members
      ? currentProject?.members?.slice(0, 3).map((member) => member.memberId)
      : []
  );

  const addMemberToProject = useMutation({
    mutationFn: AddMemberToProject,
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("New member has been added to project");
      queryClient.invalidateQueries({ queryKey: ["projectTasks"] });
    },
    onError: (error) => {
      toast.error("Failed to add member to project");
      console.error("Error adding member to project:", error);
    },
  });

  // Toggle team member selection
  const toggleMember = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
      //remove member from project
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
      addMemberToProject.mutate({
        projectId: projectId as string,
        memberId: memberId,
      });
    }
  };

  const AddNewProjectStageMutation = useMutation({
    mutationFn: AddNewProjectStage,
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("New stage has been created");
      // Handle task creation logic here
      // setOpen(false);
      // Reset form
      setNewColumnName("");
      // Invalidate projects
      queryClient.invalidateQueries({ queryKey: ["projectTasks"] });
    },
    onError: (error) => {
      toast.error("Failed to create project");
      console.error("Error creating project:", error);
    },
  });

  // Add new column
  const addColumn = () => {
    if (newColumnName.trim()) {
      const newColumnId = newColumnName.toLowerCase().replace(/\s+/g, "-");
      setColumns([
        ...columns,
        {
          id: newColumnId,
          name: newColumnName,
          createdAt: new Date(),
          updatedAt: new Date(),
          projectId: projectId as string,
        },
      ]);
      setNewColumnName("");
    }
    AddNewProjectStageMutation.mutate({
      name: newColumnName,
      projectId: projectId as string,
    });
  };

  // Remove column
  const removeColumn = (columnId: string) => {
    // setColumns(columns.filter((column) => column.id !== columnId))
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle project settings update logic here

    // Close dialog
    setOpen(false);
  };

  // Handle project deletion
  const handleDeleteProject = () => {
    // Add confirmation before deletion
    if (
      window.confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      // Handle project deletion logic here
      setOpen(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Project Settings</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Project Settings</DialogTitle>
            <DialogDescription>
              Manage settings for your project.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="team" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="columns">Columns</TabsTrigger>
              <TabsTrigger value="danger">Danger Zone</TabsTrigger>
            </TabsList>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label>Team Members</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedMembers.length > 0 ? (
                    selectedMembers.map((memberId) => {
                      const member =
                        activeWorkspace.members &&
                        activeWorkspace?.members.find((m) => m.id === memberId);
                      if (!member) return null;
                      return (
                        <Badge
                          key={member.id}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {member?.user.name}
                          <button
                            type="button"
                            onClick={() => toggleMember(member.id)}
                            className="ml-1 rounded-full p-0.5 hover:bg-muted"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">
                              Remove {member?.user.name}
                            </span>
                          </button>
                        </Badge>
                      );
                    })
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No team members selected
                    </div>
                  )}
                </div>

                <div className="mt-2 max-h-[200px] overflow-y-auto rounded-md border p-2">
                  {activeWorkspace.members &&
                    activeWorkspace.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center space-x-2 py-2"
                      >
                        <Checkbox
                          id={`member-${member.id}`}
                          checked={selectedMembers.includes(member.id)}
                          onCheckedChange={() => toggleMember(member.id)}
                        />
                        <Label
                          htmlFor={`member-${member.id}`}
                          className="flex flex-1 cursor-pointer items-center gap-2 text-sm font-normal"
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px]">
                              USR
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-1 justify-between">
                            <span>{member.user.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {member.user.role}
                            </span>
                          </div>
                        </Label>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>

            {/* Columns Tab */}
            <TabsContent value="columns" className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label>Kanban Columns</Label>
                <p className="text-sm text-muted-foreground">
                  Customize the columns displayed on your Kanban board.
                </p>

                <div className="mt-2 space-y-2">
                  {columns.map((column) => (
                    <div
                      key={column?.id}
                      className="flex items-center gap-2 rounded-md border p-2"
                    >
                      {/* <div className="h-4 w-4 rounded-full" style={{ backgroundColor: column.color }} /> */}
                      <span className="flex-1">{column.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeColumn(column?.id)}
                        disabled={["todo", "in-progress", "done"].includes(
                          column?.id
                        )}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove column</span>
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Input
                    placeholder="New column name"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addColumn}>
                    Add Column
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Danger Zone Tab */}
            <TabsContent value="danger" className="space-y-4 pt-4">
              <div className="rounded-md border border-destructive/20 p-4">
                <h3 className="text-lg font-medium text-destructive">
                  Delete Project
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Once you delete a project, there is no going back. This action
                  cannot be undone.
                </p>
                <Button
                  type="button"
                  variant="destructive"
                  className="mt-4"
                  onClick={handleDeleteProject}
                >
                  Delete Project
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </DialogContent>
    </Dialog>
  );
}
