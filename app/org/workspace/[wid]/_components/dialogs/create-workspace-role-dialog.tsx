"use client"

import type React from "react"

import { WorkspaceRole } from "@/app/types"
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
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import AddNewWorkspaceRole from "@/hooks/Functions/AddNewWorkspaceRole"
import rolesStore from "@/store/rolesStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useStore } from "zustand"
import { error } from "console"

enum PermissionType {
  VIEW_PROJECT = 'VIEW_PROJECT',
  ALL_PROJECT = 'ALL_PROJECT',
  CREATE_PROJECT = 'CREATE_PROJECT',
  EDIT_PROJECT = 'EDIT_PROJECT',
  DELETE_PROJECT = 'DELETE_PROJECT',

  VIEW_TASK = 'VIEW_TASK',
  ALL_TASK = 'ALL_TASK',
  CREATE_TASK = 'CREATE_TASK',
  EDIT_ANY_TASK = 'EDIT_ANY_TASK',
  DELETE_TASK = 'DELETE_TASK',

  ADD_MEMBER = 'ADD_MEMBER',
  REMOVE_MEMBER = 'REMOVE_MEMBER',
  CHANGE_MEMBER_ROLE = 'CHANGE_MEMBER_ROLE',

  CREATE_EVENT = 'CREATE_EVENT',
  EDIT_EVENT = 'EDIT_EVENT',
  EDIT_ANY_EVENT = 'EDIT_ANY_EVENT',
  DELETE_EVENT = 'DELETE_EVENT',
}
export interface RolePermission {
  id: string
  name: string
  description: string
}

export interface PermissionCategory {
  id: string
  name: string
  permissions: RolePermission[]
}

export interface CustomRole {
  name: string
  description: string
  permissions: string[]
  workspaceId: string
}



export function CreateWorkspaceRoleDialog({trigger, type, role}: {trigger: React.ReactNode, type: "new" | "edit";
  role?: WorkspaceRole;}) {
    const params = useParams();
    const queryClient = useQueryClient();
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(type === "edit" ? role?.name : "")
  const [description, setDescription] = useState(type === "edit" ? role?.description : "")
  const [permissions, setPermissions] = useState<string[]>([])
console.log(permissions, "permissions")
  const workspacePermissions = useStore(
      rolesStore,
      (state) => state.workspacePermissions
    );

   useEffect(() => {
      if (type === "edit" && role?.permissions && open) {
        console.log(role.permissions, "role.permissions");
        setPermissions(role.permissions.map((permission) => permission?.permission?.id!));
      }
    }, [type, role, open]);

  console.log(role)

  // Permission categories
  const permissionCategories: PermissionCategory[] = [
    {
      id: "projects",
      name: "Projects",
      permissions: [
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.CREATE_PROJECT)?.id!,
          name: "Create Projects",
          description: "Can create new projects in the workspace",
          
        },
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.EDIT_PROJECT)?.id!,
          name: "Edit Projects",
          description: "Can edit project details and settings",
          
        },
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.DELETE_PROJECT)?.id!,
          name: "Delete Projects",
          description: "Can delete projects from the workspace",
          
        },
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.VIEW_PROJECT)?.id!,
          name: "View Projects",
          description: "Can view all projects in the workspace",
          
        },
      ],
    },
    {
      id: "tasks",
      name: "Tasks",
      permissions: [
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.CREATE_TASK)?.id!,
          name: "Create Tasks",
          description: "Can create new tasks in projects",
          
        },
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.EDIT_ANY_TASK)?.id!,
          name: "Edit Any Task",
          description: "Can edit any task, including those created by others",
          
        },
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.DELETE_TASK)?.id!,
          name: "Delete Tasks",
          description: "Can delete tasks from projects",
          
        },
        // {
        //   id: workspacePermissions.find((p) => p.name === PermissionType.)?.id!,
        //   name: "Assign Tasks",
        //   description: "Can assign tasks to other members",
        //   
        // },
      ],
    },
    {
      id: "team",
      name: "Team",
      permissions: [
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.ADD_MEMBER)?.id!,
          name: "Invite Members",
          description: "Can invite new members to the workspace",
          
        },
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.REMOVE_MEMBER)?.id!,
          name: "Remove Members",
          description: "Can remove members from the workspace",
          
        },
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.CHANGE_MEMBER_ROLE)?.id!,
          name: "Change Member Roles",
          description: "Can change roles of other members",
          
        },
      ],
    },
    {
      id: "calendar",
      name: "Calendar",
      permissions: [
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.VIEW_EVENT)?.id!,
          name: "View Calendar",
          description: "Can view the calendar and events",
          
        },
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.CREATE_EVENT)?.id!,
          name: "Create Events",
          description: "Can create calendar events",
          
        },
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.EDIT_ANY_EVENT)?.id!,
          name: "Edit Any Event",
          description: "Can edit events created by others",
          
        },
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.CANCEL_EVENT)?.id!,
          name: "Cancel Events",
          description: "Can cancel events created by others",         
        },
        {
          id: workspacePermissions.find((p) => p.name === PermissionType.DELETE_EVENT)?.id!,
          name: "Delete Events",
          description: "Can delete calendar events",
          
        },
      ],
    }
  ]

  // // Initialize permissions state
  // useState(() => {
  //   const initialPermissions: Record<string, boolean> = {}
  //   permissionCategories.forEach((category) => {
  //     category.permissions.forEach((permission) => {
  //       initialPermissions[permission.id] = permission.enabled
  //     })
  //   })
  //   setPermissions(initialPermissions)
  // })

  // Toggle permission
  const togglePermission = (permissionId: string) => {
    if (permissions.some((permission) => permission === permissionId)) {
      const newPermissions = permissions.filter(
        (permission) => permission !== permissionId
      );
      setPermissions(newPermissions);
      return;
    }
    const newPermissions = [...permissions, permissionId];
    setPermissions(newPermissions);
  };


  const addNewRole = useMutation({
    mutationFn: AddNewWorkspaceRole,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-by-id", params.wid],
      });
      toast.success(response.message);
      setOpen(false);
      resetForm();
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  });

 // Reset form
 const resetForm = () => {
  setName("");
  setDescription("");
  setPermissions([]);
};

 // Handle form submission
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
 
     const newRole: CustomRole = {
       name: name!,
       description: description!,
       permissions,
       workspaceId: params.wid as string,
     };
     console.log(newRole, "payload");
     addNewRole.mutate(newRole);
     setOpen(false);
     resetForm();
   };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{ type === "edit" ? "Edit Role" : "Create Custom Role"}</DialogTitle>
            <DialogDescription>{ type === "edit" ? "Edit the role with custom permissions for your workspace." : "Define a new role with custom permissions for your workspace."}</DialogDescription>
          </DialogHeader>

          <div className="mt-6 grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="role-name">Role Name</Label>
              <Input
                id="role-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Project Manager, Content Editor"
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="role-description">Description</Label>
              <Textarea
                id="role-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the purpose and responsibilities of this role"
                className="min-h-[80px]"
              />
            </div>

            <div className="grid gap-3">
              <Label>Permissions</Label>
              <Tabs defaultValue={permissionCategories[0].id} className="w-full">
                <TabsList className="grid w-full grid-cols-2 gap-1 overflow-x-auto md:grid-cols-5">
                  {permissionCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {permissionCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-4 space-y-4">
                    <div className="rounded-md border">
                      <div className="bg-muted/50 px-4 py-2 font-medium">{category.name}</div>
                      <div className="divide-y">
                        {category.permissions.map((permission) => (
                          <div key={permission.id} className="flex items-center justify-between px-4 py-3">
                            <div>
                              <div className="font-medium">{permission.name}</div>
                              <div className="text-sm text-muted-foreground">{permission.description}</div>
                            </div>
                            <Switch
                              checked={permissions.some(
                                (p) => p === permission.id
                              )}
                              onCheckedChange={() => togglePermission(permission.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{ type === "edit" ? "Update Role" : "Create Role"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
