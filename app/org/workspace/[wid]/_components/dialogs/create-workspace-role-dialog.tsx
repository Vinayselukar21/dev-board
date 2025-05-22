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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"

export interface RolePermission {
  id: string
  name: string
  description: string
  enabled: boolean
}

export interface PermissionCategory {
  id: string
  name: string
  permissions: RolePermission[]
}

export interface CustomRole {
  id: string
  name: string
  description: string
  permissions: Record<string, boolean>
}



export function CreateWorkspaceRoleDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [permissions, setPermissions] = useState<Record<string, boolean>>({})

  // Permission categories
  const permissionCategories: PermissionCategory[] = [
    {
      id: "projects",
      name: "Projects",
      permissions: [
        {
          id: "projects.create",
          name: "Create Projects",
          description: "Can create new projects in the workspace",
          enabled: true,
        },
        {
          id: "projects.edit",
          name: "Edit Projects",
          description: "Can edit project details and settings",
          enabled: true,
        },
        {
          id: "projects.delete",
          name: "Delete Projects",
          description: "Can delete projects from the workspace",
          enabled: false,
        },
        {
          id: "projects.view",
          name: "View Projects",
          description: "Can view all projects in the workspace",
          enabled: true,
        },
      ],
    },
    {
      id: "tasks",
      name: "Tasks",
      permissions: [
        {
          id: "tasks.create",
          name: "Create Tasks",
          description: "Can create new tasks in projects",
          enabled: true,
        },
        {
          id: "tasks.edit",
          name: "Edit Any Task",
          description: "Can edit any task, including those created by others",
          enabled: true,
        },
        {
          id: "tasks.delete",
          name: "Delete Tasks",
          description: "Can delete tasks from projects",
          enabled: false,
        },
        {
          id: "tasks.assign",
          name: "Assign Tasks",
          description: "Can assign tasks to other members",
          enabled: true,
        },
      ],
    },
    {
      id: "team",
      name: "Team Management",
      permissions: [
        {
          id: "team.invite",
          name: "Invite Members",
          description: "Can invite new members to the workspace",
          enabled: false,
        },
        {
          id: "team.remove",
          name: "Remove Members",
          description: "Can remove members from the workspace",
          enabled: false,
        },
        {
          id: "team.roles",
          name: "Change Member Roles",
          description: "Can change roles of other members",
          enabled: false,
        },
        {
          id: "team.view",
          name: "View Team Members",
          description: "Can view all team members",
          enabled: true,
        },
      ],
    },
    {
      id: "calendar",
      name: "Calendar & Events",
      permissions: [
        {
          id: "calendar.create",
          name: "Create Events",
          description: "Can create calendar events",
          enabled: true,
        },
        {
          id: "calendar.edit",
          name: "Edit Any Event",
          description: "Can edit events created by others",
          enabled: false,
        },
        {
          id: "calendar.delete",
          name: "Delete Events",
          description: "Can delete calendar events",
          enabled: false,
        },
        {
          id: "calendar.view",
          name: "View Calendar",
          description: "Can view the calendar and events",
          enabled: true,
        },
      ],
    },
    {
      id: "settings",
      name: "Settings",
      permissions: [
        {
          id: "settings.workspace",
          name: "Workspace Settings",
          description: "Can modify workspace settings",
          enabled: false,
        },
        {
          id: "settings.billing",
          name: "Billing & Subscription",
          description: "Can access and modify billing information",
          enabled: false,
        },
        {
          id: "settings.integrations",
          name: "Integrations",
          description: "Can manage workspace integrations",
          enabled: false,
        },
        {
          id: "settings.view",
          name: "View Settings",
          description: "Can view workspace settings",
          enabled: true,
        },
      ],
    },
  ]

  // Initialize permissions state
  useState(() => {
    const initialPermissions: Record<string, boolean> = {}
    permissionCategories.forEach((category) => {
      category.permissions.forEach((permission) => {
        initialPermissions[permission.id] = permission.enabled
      })
    })
    setPermissions(initialPermissions)
  })

  // Toggle permission
  const togglePermission = (permissionId: string) => {
    setPermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }))
  }

  // Reset form
  const resetForm = () => {
    setName("")
    setDescription("")
    const initialPermissions: Record<string, boolean> = {}
    permissionCategories.forEach((category) => {
      category.permissions.forEach((permission) => {
        initialPermissions[permission.id] = permission.enabled
      })
    })
    setPermissions(initialPermissions)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      alert("Please enter a role name")
      return
    }

    const newRole: CustomRole = {
      id: `role-${Date.now()}`,
      name,
      description,
      permissions,
    }

    // onRoleCreated(newRole)
    setOpen(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-2">
          <Plus className="mr-2 h-4 w-4" />
          Create Custom Role - Workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Custom Role</DialogTitle>
            <DialogDescription>Define a new role with custom permissions for your workspace.</DialogDescription>
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
                              checked={permissions[permission.id] || false}
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
            <Button type="submit">Create Role</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
