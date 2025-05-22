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
import { useStore } from "zustand"
import organizationStore from "@/store/organizationStore"
import { useMutation } from "@tanstack/react-query"
import AddNewOrgRole from "@/hooks/Functions/AddNewOrgRole"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import workspaceStore from "@/store/workspaceStore"

enum OrgPermissionType {
  OWNER = 'OWNER',

  VIEW_ORG = 'VIEW_ORG',
  EDIT_ORG = 'EDIT_ORG',
  DELETE_ORG = 'DELETE_ORG',
  
  ONBOARD_USER = 'ONBOARD_USER',
  REMOVE_USER = 'REMOVE_USER',
  CHANGE_USER_ROLE = 'CHANGE_USER_ROLE',

  VIEW_WORKSPACE = 'VIEW_WORKSPACE',
  CREATE_WORKSPACE = 'CREATE_WORKSPACE',
  EDIT_WORKSPACE = 'EDIT_WORKSPACE',
  DELETE_WORKSPACE = 'DELETE_WORKSPACE',
}

export interface RolePermission {
  id: string
  name: string
  description: string
  enabled: boolean
  value: OrgPermissionType
}

export interface PermissionCategory {
  id: string
  name: string
  permissions: RolePermission[]
}

export interface CustomRole {
  name: string,
    description: string,
    permissions: {
      type: string,
    }[],
    organizationId: string
}



export function CreateOrgRoleDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [permissions, setPermissions] = useState<{type: string}[]>([])

  const activeOrganization = useStore(organizationStore, (state) => state.activeOrganization)
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace)

  const queryClient = useQueryClient()

  // Permission categories
  const permissionCategories: PermissionCategory[] = [
    {
      id: "organization",
      name: "Organization",
      permissions: [
        {
          id: "organization.view",
          name: "View Organization",
          description: "Can view all organization",
          enabled: true,
          value: OrgPermissionType.VIEW_ORG
        },
        {
          id: "organization.edit",
          name: "Edit Organization",
          description: "Can edit organization details and settings",
          enabled: false,
          value: OrgPermissionType.EDIT_ORG
        },
        {
          id: "organization.delete",
          name: "Delete Organization",
          description: "Can delete organization",
          enabled: false,
          value: OrgPermissionType.DELETE_ORG
        },
      ],
    },
    {
      id: "members",
      name: "Members",
      permissions: [
        {
          id: "organization.onboard",
          name: "Onboard New Members",
          description: "Can onboard new members to organization",
          enabled: false,
          value: OrgPermissionType.ONBOARD_USER
        },
        {
          id: "organization.removeuser",
          name: "Remove Members",
          description: "Can remove members from organization",
          enabled: false,
          value: OrgPermissionType.REMOVE_USER
        },
        {
          id: "organization.changeuserrole",
          name: "Change User Role",
          description: "Can change user role in organization",
          enabled: false,
          value: OrgPermissionType.CHANGE_USER_ROLE
        },
      ],
    },
    {
      id: "workspace",
      name: "Workspace",
      permissions: [
        {
          id: "workspace.view",
          name: "View Workspace",
          description: "Can view all workspace",
          enabled: true,
          value: OrgPermissionType.VIEW_WORKSPACE
        },
        {
          id: "workspace.create",
          name: "Create Workspace",
          description: "Can create new workspace",
          enabled: false,
          value: OrgPermissionType.CREATE_WORKSPACE
        },
        {
          id: "workspace.edit",
          name: "Edit Workspace",
          description: "Can edit workspace details and settings",
          enabled: false,
          value: OrgPermissionType.EDIT_WORKSPACE
        },
        {
          id: "workspace.delete",
          name: "Delete Workspace",
          description: "Can delete workspace",
          enabled: false,
          value: OrgPermissionType.DELETE_WORKSPACE
        },
      ],
    },
  ]

  // Initialize permissions state
  // useState(() => {
  //   const initialPermissions: Record<string, boolean> = {}
  //   permissionCategories.forEach((category) => {
  //     category.permissions.forEach((permission) => {
  //       initialPermissions[permission.id] = permission.enabled
  //     })
  //   })
  //   setPermissions(initialPermissions)
  // })
console.log(permissions, " permissions")
  // Toggle permission
  const togglePermission = (type: string) => {
    if (permissions.some((permission) => permission.type === type)) {
      const newPermissions = permissions.filter(
        (permission) => permission.type !== type
      );
      setPermissions(newPermissions);
      return;
    }
    const newPermissions = [...permissions, { type }];
    setPermissions(newPermissions);
  };

  // Reset form
  const resetForm = () => {
    setName("")
    setDescription("")
    setPermissions([])
  }


  const addNewRole = useMutation({
    mutationFn: AddNewOrgRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles", activeOrganization.id, activeWorkspace.id] })
      toast.success("New role has been added")
      setOpen(false)
      resetForm()
    }
  })

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      alert("Please enter a role name")
      return
    }

    const newRole: CustomRole = {
      name,
      description,
      permissions,
      organizationId: activeOrganization?.id
    }
console.log(newRole, "payload")
    addNewRole.mutate(newRole)
    setOpen(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-2">
          <Plus className="mr-2 h-4 w-4" />
          Create Custom Role - Organization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Custom Role</DialogTitle>
            <DialogDescription>Define a new role with custom permissions for your organization.</DialogDescription>
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
                              // checked={permissions[permission.id] || false}
                              onCheckedChange={() => togglePermission(permission.value)}
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
