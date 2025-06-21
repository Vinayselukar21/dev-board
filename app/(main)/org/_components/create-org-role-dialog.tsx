"use client";

import type React from "react";

import { OrganizationRole } from "@/app/types";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import AddNewOrgRole from "@/hooks/Functions/AddNewOrgRole";
import UpdateOrgRole from "@/hooks/Functions/UpdateOrgRole";
import organizationStore from "@/store/organizationStore";
import rolesStore from "@/store/rolesStore";
import workspaceStore from "@/store/workspaceStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useStore } from "zustand";

enum OrgPermissionType {
  OWNER = "OWNER",

  VIEW_ORG = "VIEW_ORG",
  EDIT_ORG = "EDIT_ORG",
  DELETE_ORG = "DELETE_ORG",

  ONBOARD_USER = "ONBOARD_USER",
  REMOVE_USER = "REMOVE_USER",
  CHANGE_USER_ROLE = "CHANGE_USER_ROLE",

  VIEW_WORKSPACE = "VIEW_WORKSPACE",
  CREATE_WORKSPACE = "CREATE_WORKSPACE",
  EDIT_WORKSPACE = "EDIT_WORKSPACE",
  DELETE_WORKSPACE = "DELETE_WORKSPACE",

  CREATE_CUSTOM_ORG_ROLE = "CREATE_CUSTOM_ORG_ROLE",
  EDIT_CUSTOM_ORG_ROLE = "EDIT_CUSTOM_ORG_ROLE",
  DELETE_CUSTOM_ORG_ROLE = "DELETE_CUSTOM_ORG_ROLE",
}

export interface RolePermission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  value: OrgPermissionType;
}

export interface PermissionCategory {
  id: string;
  name: string;
  permissions: RolePermission[];
}

export interface CustomRole {
  name: string;
  description: string;
  permissions: string[];
  organizationId: string;
}

export function CreateOrgRoleDialog({
  trigger,
  type,
  role,
}: {
  trigger: React.ReactNode;
  type: "new" | "edit";
  role?: OrganizationRole;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(type === "edit" ? role?.name : "");
  const [description, setDescription] = useState(
    type === "edit" ? role?.description : ""
  );
  const [permissions, setPermissions] = useState<string[]>([]);
  const orgPermissions = useStore(
    rolesStore,
    (state) => state.orgPermissions
  );
  useEffect(() => {
    if (type === "edit" && role?.permissions && open) {
      console.log(role.permissions, "role.permissions");
      setPermissions(role.permissions.map((permission) => permission?.permission?.id!));
    }
  }, [type, role, open]);

  console.log(permissions, "permissions", role?.permissions);
  const activeOrganization = useStore(
    organizationStore,
    (state) => state.activeOrganization
  );
  const activeWorkspace = useStore(
    workspaceStore,
    (state) => state.activeWorkspace
  );

  const queryClient = useQueryClient();

  // Permission categories
  const permissionCategories: PermissionCategory[] = [
    {
      id: "organization",
      name: "Organization",
      permissions: [
        {
          id: orgPermissions.find((p) => p.name === OrgPermissionType.VIEW_ORG)?.id!,
          name: "View Organization",
          description: "Can view all organization",
          enabled: true,
          value: OrgPermissionType.VIEW_ORG,
        },
        {
          id: orgPermissions.find((p) => p.name === OrgPermissionType.EDIT_ORG)?.id!,
          name: "Edit Organization",
          description: "Can edit organization details and settings",
          enabled: false,
          value: OrgPermissionType.EDIT_ORG,
        },
        {
          id: orgPermissions.find((p) => p.name === OrgPermissionType.DELETE_ORG)?.id!,
          name: "Delete Organization",
          description: "Can delete organization",
          enabled: false,
          value: OrgPermissionType.DELETE_ORG,
        },
      ],
    },
    {
      id: "members",
      name: "Members",
      permissions: [
        {
          id: orgPermissions.find((p) => p.name === OrgPermissionType.ONBOARD_USER)?.id!,
          name: "Onboard New Members",
          description: "Can onboard new members to organization",
          enabled: false,
          value: OrgPermissionType.ONBOARD_USER,
        },
        {
          id: orgPermissions.find((p) => p.name === OrgPermissionType.REMOVE_USER)?.id!,
          name: "Remove Members",
          description: "Can remove members from organization",
          enabled: false,
          value: OrgPermissionType.REMOVE_USER,
        },
        {
          id: orgPermissions.find((p) => p.name === OrgPermissionType.CHANGE_USER_ROLE)?.id!,
          name: "Change User Role",
          description: "Can change user role in organization",
          enabled: false,
          value: OrgPermissionType.CHANGE_USER_ROLE,
        },
      ],
    },
    {
      id: "workspace",
      name: "Workspace",
      permissions: [
        {
          id: orgPermissions.find((p) => p.name === OrgPermissionType.VIEW_WORKSPACE)?.id!,
          name: "View Workspace",
          description: "Can view all workspace",
          enabled: true,
          value: OrgPermissionType.VIEW_WORKSPACE,
        },
        {
          id: orgPermissions.find((p) => p.name === OrgPermissionType.CREATE_WORKSPACE)?.id!,
          name: "Create Workspace",
          description: "Can create new workspace",
          enabled: false,
          value: OrgPermissionType.CREATE_WORKSPACE,
        },
        {
          id: orgPermissions.find((p) => p.name === OrgPermissionType.EDIT_WORKSPACE)?.id!,
          name: "Edit Workspace",
          description: "Can edit workspace details and settings",
          enabled: false,
          value: OrgPermissionType.EDIT_WORKSPACE,
        },
        {
          id: orgPermissions.find((p) => p.name === OrgPermissionType.DELETE_WORKSPACE)?.id!,
          name: "Delete Workspace",
          description: "Can delete workspace",
          enabled: false,
          value: OrgPermissionType.DELETE_WORKSPACE,
        },
      ],
    },
    {
      id: "roles",
      name: "Roles",
      permissions: [
        {
          id: orgPermissions.find((p) => p.name === OrgPermissionType.CREATE_CUSTOM_ORG_ROLE)?.id!,
          name: "Create Custom Role",
          description: "Can create custom role",
          enabled: true,
          value: OrgPermissionType.CREATE_CUSTOM_ORG_ROLE,
        },
        {
          id: orgPermissions.find((p) => p.name === OrgPermissionType.EDIT_CUSTOM_ORG_ROLE)?.id!,
          name: "Edit Custom Role",
          description: "Can edit custom role",
          enabled: false,
          value: OrgPermissionType.EDIT_CUSTOM_ORG_ROLE,
        },
        {
          id: orgPermissions.find((p) => p.name === OrgPermissionType.DELETE_CUSTOM_ORG_ROLE)?.id!,
          name: "Delete Custom Role",
          description: "Can delete custom role",
          enabled: false,
          value: OrgPermissionType.DELETE_CUSTOM_ORG_ROLE,
        }
      ],
    },
  ];

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

  // Reset form
  const resetForm = () => {
    setName("");
    setDescription("");
    setPermissions([]);
  };

  const addNewRole = useMutation({
    mutationFn: AddNewOrgRole,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["roles", activeOrganization.id, activeWorkspace.id],
      });
      toast.success(response.message);
      setOpen(false);
      resetForm();
    },
    onError:(error: {response: {data: {message: string}}})=>{
      toast.error(error?.response?.data?.message )
    }
  });

  const updateRole = useMutation({
    mutationFn: UpdateOrgRole,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["roles", activeOrganization.id, activeWorkspace.id],
      });
      toast.success(response.message);
      setOpen(false);
      resetForm();
    },
    onError:(error: {response: {data: {message: string}}})=>{
      toast.error(error?.response?.data?.message )
    }
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRole: CustomRole = {
      name: name!,
      description: description!,
      permissions,
      organizationId: activeOrganization?.id,
    };
    console.log(newRole, "payload");
    addNewRole.mutate(newRole);
    setOpen(false);
    resetForm();
  };

  const handleUpdateRole = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedRole = {
      name: name!,
      description: description!,
      permissions,
      organizationId: activeOrganization?.id,
      roleId: role?.id!,
    };
    console.log(updatedRole, "payload");
    updateRole.mutate(updatedRole);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
       {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
       <form onSubmit={type === "edit" ? handleUpdateRole : handleSubmit}>
          <DialogHeader>
            <DialogTitle>{type === "edit" ? "Edit Role" : "Create Custom Role"}</DialogTitle>
            <DialogDescription>
              {type === "edit" ? "Edit the role with custom permissions for your organization." : "Define a new role with custom permissions for your organization."}
            </DialogDescription>
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
              <Tabs
                defaultValue={permissionCategories[0].id}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 gap-1 overflow-x-auto md:grid-cols-5">
                  {permissionCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {permissionCategories.map((category) => (
                  <TabsContent
                    key={category.id}
                    value={category.id}
                    className="mt-4 space-y-4"
                  >
                    <div className="rounded-md border">
                      <div className="bg-muted/50 px-4 py-2 font-medium">
                        {category.name}
                      </div>
                      <div className="divide-y">
                        {category.permissions && category.permissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center justify-between px-4 py-3"
                          >
                            <div>
                              <div className="font-medium">
                                {permission.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {permission.description}
                              </div>
                            </div>
                            <Switch
                              checked={permissions.some(
                                (p) => p === permission.id
                              )}
                              onCheckedChange={() =>
                              {  const permissionId = orgPermissions.find((p) => p.name === permission.value)?.id;
                                togglePermission(permissionId!)}
                              }
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
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{type === "edit" ? "Update Role" : "Create Role"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
