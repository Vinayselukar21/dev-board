import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import organizationStore from "@/store/organizationStore";
import rolesStore from "@/store/rolesStore";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useStore } from "zustand";
import { CreateOrgRoleDialog } from "./create-org-role-dialog";

export default function PermissionSettings() {
  const organizationRolesData = useStore(rolesStore, (state) => state.organizationRolesData)
  const activeOrganization = useStore(organizationStore, (state) => state.activeOrganization)
  const [selectedRole, setSelectedRole] = useState<string>("")

  const orgRoleData = organizationRolesData?.find((role) => role.id === selectedRole)?.permissions
  console.log(orgRoleData, "orgRoleData")
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>Permissions & Roles</CardTitle>
          <CardDescription>
            Manage workspace roles and permissions for team members.
          </CardDescription>
        </div>
        <CreateOrgRoleDialog type="new" trigger={<Button variant="outline" size="sm" className="mt-2">
          <Plus className="mr-2 h-4 w-4" />
          Create Custom Role - Organization
        </Button>} />
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
                      <td className="px-4 py-3 text-sm">{role.members?.length}</td>
                      <td className="px-4 py-3 text-sm">
                        <CreateOrgRoleDialog type="edit" role={role} trigger={role.name !== "Owner" && <Button variant="ghost" size="sm">
                          Edit 
                        </Button>} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
