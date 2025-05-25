"use client";

import type React from "react";

import { Project } from "@/app/types";
import { Button } from "@/components/ui/button";
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
import AddNewProjectStage from "@/hooks/Functions/AddNewProjectStage";
import workspaceStore from "@/store/workspaceStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useStore } from "zustand";

interface ManageProjectKanbanBoardColumnsProps {
  projectId: string;
  projectTaskData: Project | null;
  trigger: React.ReactNode;
}

export function ManageProjectKanbanBoardColumns({
  projectId,
  projectTaskData,
  trigger,
}: ManageProjectKanbanBoardColumnsProps) {
  const queryClient = useQueryClient();
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace);
  const [open, setOpen] = useState(false);
  // Find the current project from the workspace
  const currentProject = projectTaskData || null;
  const [columns, setColumns] = useState(currentProject?.taskStages || []);
  const [newColumnName, setNewColumnName] = useState("");

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
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Manage Kanban Columns</DialogTitle>
            <DialogDescription>
                  Customize the columns displayed on your Kanban board.
            </DialogDescription>
          </DialogHeader>
          

              <div className="grid gap-2">
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
                        onClick={() => {}}
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
                  <Button type="button" onClick={() => addColumn()}>
                    Add Column
                  </Button>
                </div>
              </div>
      </DialogContent>
    </Dialog>
  );
}
