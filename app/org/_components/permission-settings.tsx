import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import useGetRoles from "@/hooks/useGetAllRoles";
import { CreateOrgRoleDialog } from "./create-org-role-dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import rolesStore from "@/store/rolesStore";
import { useStore } from "zustand";


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
interface PermissionCategory {
  id: string;
  name: string;
  permissions: RolePermission[];
}

interface RolePermission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  value: OrgPermissionType;
}

export default function PermissionSettings() {
  const organizationRolesData = useStore(rolesStore, (state) => state.organizationRolesData)
  const [selectedRole, setSelectedRole] = useState<string>("")

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
const orgRoleData = organizationRolesData?.find((role) => role.id === selectedRole)?.permissions
console.log(orgRoleData, "orgRoleData")
  return (
    <Card>
      <CardHeader>
        <CardTitle>Permissions & Roles</CardTitle>
        <CardDescription>
          Manage workspace roles and permissions for team members.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Role Management */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Role Management</h3>
          <div className="overflow-hidden rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Members
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {organizationRolesData?.map((role) => (
                    <tr key={role.id}>
                      <td className="px-4 py-3 font-medium">{role.name}</td>
                      <td className="px-4 py-3 text-sm">
                        {role.description}
                      </td>
                      <td className="px-4 py-3 text-sm">2</td>
                      <td className="px-4 py-3 text-sm">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* <Button variant="outline" size="sm" className="mt-2">
            <Plus className="mr-2 h-4 w-4" />
            Create Custom Role
          </Button> */}
          <CreateOrgRoleDialog/>
        </div>

        {/* Permission Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Permission Settings</h3>
          <div className="rounded-md border p-4">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-medium">Role to Configure</h4>
                <p className="text-sm text-muted-foreground">
                  Select a role to configure permissions
                </p>
              </div>
              <Select defaultValue={selectedRole} onValueChange={(value) => setSelectedRole(value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {organizationRolesData?.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {permissionCategories?.map((category) => (
                 <div className="rounded-md border" key={category.id}>
                 <div className="bg-muted/50 px-4 py-2 font-medium">
                   {category.name}
                 </div>
                 <div className="divide-y">
                   {category.permissions?.map((permission) => {
                    const isChecked = orgRoleData?.find((perm) => perm.type === permission.value)?.type === permission.value
                    return (
                      <div className="flex items-center justify-between px-4 py-3" key={permission.id}>
                      <div>
                        <div className="font-medium">{permission?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {permission?.description}
                        </div>
                      </div>
                      <Switch checked={isChecked} />
                    </div>
                      )
                   })}
                   
                 </div>
               </div>
              ))}
            </div>
          </div>
        </div>
       
        {/* Member Role Assignment */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Member Role Assignment</h3>
          <div className="overflow-hidden rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Member
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Current Role
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>AK</AvatarFallback>
                        </Avatar>
                        <span>Alex Kim</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">alex@example.com</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge>Admin</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Select defaultValue="admin">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <span>Sarah Johnson</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">sarah@example.com</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant="outline">Member</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Select defaultValue="member">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                        <span>Michael Chen</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">michael@example.com</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant="outline">Member</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Select defaultValue="member">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>JT</AvatarFallback>
                        </Avatar>
                        <span>Jessica Taylor</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">jessica@example.com</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant="secondary">Viewer</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Select defaultValue="viewer">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
