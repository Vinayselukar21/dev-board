"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import workspaceStore from "@/store/workspaceStore";
import { Mail, Pencil, Phone, Plus, Search, Trash } from "lucide-react";
import { useStore } from "zustand";
import { useAuth } from "../providers/AuthProvider";
import { Project, User, Workspace } from "../types";
import { Button } from "@/components/ui/button";
import organizationStore from "@/store/organizationStore";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import RegisterUserDialog from "./_components/register-new-user-dialog";
import { CreateWorkspaceDialog } from "@/components/create-workspace-dialog";
import useGetRoles from "@/hooks/useGetAllRoles";
import PermissionSettings from "./_components/permission-settings";

export default function TeamPage() {
  const router = useRouter();
  // Fetch all roles & permissions in an organization
  const {
    organizationRolesData,
    workspaceRolesData,
    rolesLoading,
    errorLoadingRoles,
  } = useGetRoles();

  const activeOrganization = useStore(
    organizationStore,
    (state) => state.activeOrganization
  );
  const orgMembers = activeOrganization?.users;
  const orgWorkspaces = activeOrganization?.workspaces;

  const handleEditWorkspace = (workspace: Workspace) => {
    console.log(workspace);
    router.push(`/org/workspace/${workspace.id}`);
  };

  const handleEdit = (member: User) => {
    console.log(member);
    router.push(`/org/${member.id}`);
  };

  const handleDelete = (member: User) => {
    console.log(member);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <h1 className="text-lg font-semibold">{activeOrganization?.name}</h1>
          <div className="ml-auto flex items-center gap-2">
            <form className="hidden sm:flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search team members..."
                  className="w-60 rounded-lg bg-background pl-8"
                />
              </div>
            </form>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="flex flex-col gap-6">
            {/* Tabs */}
            <Tabs defaultValue="workspaces">
              <TabsList>
                <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
                <TabsTrigger value="members">Organization Members</TabsTrigger>
                <TabsTrigger value="permissions">
                  Roles & Permissions 
                </TabsTrigger>
              </TabsList>
              <TabsContent value="workspaces" className="pt-4">
                <Card>
                  <CardHeader className="pb-2 flex items-center justify-between">
                    <div>
                      <CardTitle>Workspaces</CardTitle>
                      <CardDescription>
                        View and manage all workspaces in your organization.
                      </CardDescription>
                    </div>
                    <CreateWorkspaceDialog
                      trigger={
                        <Button size="sm">
                          <Plus />
                          <span>Add Workspace</span>
                        </Button>
                      }
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-lg border">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium">
                              Name
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium">
                              Description
                            </th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium sm:table-cell">
                              Members
                            </th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">
                              Projects
                            </th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium lg:table-cell">
                              Departments
                            </th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium lg:table-cell">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {orgWorkspaces &&
                            orgWorkspaces.map((workspace: Workspace) => (
                              <tr
                                key={workspace?.id}
                                className="hover:bg-muted/50"
                              >
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-3">
                                    <div>
                                      <div className="font-medium">
                                        {workspace?.name}
                                      </div>
                                      <div className="hidden text-xs text-muted-foreground sm:block md:hidden">
                                        {workspace?.description}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {workspace?.description}
                                </td>
                                <td className="hidden px-4 py-3 text-sm md:table-cell">
                                  <div className="flex flex-col gap-1">
                                    {workspace?.members?.length}
                                  </div>
                                </td>
                                <td className="hidden px-4 py-3 text-sm lg:table-cell">
                                  <div className="flex flex-wrap gap-1">
                                    {workspace?.projects?.length}
                                  </div>
                                </td>
                                <td className="hidden px-4 py-3 text-sm lg:table-cell">
                                  <div className="flex flex-wrap gap-1">
                                    {workspace?.departments?.length}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm flex gap-2">
                                  <Button
                                    variant="outline"
                                    className="hover:bg-gray-900 hover:text-white"
                                    size="icon"
                                    onClick={() =>
                                      handleEditWorkspace(workspace)
                                    }
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="hover:bg-gray-900 hover:text-white"
                                    size="icon"
                                    // onClick={() => handleDelete(member)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="members" className="pt-4">
                <Card>
                  <CardHeader className="pb-2 flex items-center justify-between">
                    <div>
                      <CardTitle>Members</CardTitle>
                      <CardDescription>
                        View and manage all members in your organization.
                      </CardDescription>
                    </div>
                    <RegisterUserDialog
                      trigger={
                        <Button size="sm" className="h-8 gap-1">
                          <Plus className="h-4 w-4" />
                          Add Member
                        </Button>
                      }
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-lg border">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium">
                              Name
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium">
                              Job Title
                            </th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium sm:table-cell">
                              Designation
                            </th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">
                              Contact
                            </th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium lg:table-cell">
                              Workspaces
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {orgMembers &&
                            orgMembers.map((member: User) => (
                              <tr
                                key={member?.id}
                                className="hover:bg-muted/50"
                              >
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-3">
                                    {/* <Avatar>
                                    <AvatarImage
                                      src={member?.user?.avatar ?? ""}
                                      alt={member?.user?.name ?? ""}
                                    />
                                    <AvatarFallback>
                                      {member?.user?.initials ?? ""}
                                    </AvatarFallback>
                                  </Avatar> */}
                                    <div>
                                      <div className="font-medium">
                                        {member?.name}{" "}
                                        <Badge variant="outline">
                                          {member?.organizationRole?.name}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {member?.jobTitle}
                                </td>
                                <td className="hidden px-4 py-3 text-sm sm:table-cell">
                                  {member?.designation}
                                </td>
                                <td className="hidden px-4 py-3 text-sm md:table-cell">
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1 text-xs">
                                      <Mail className="h-3 w-3" />
                                      <span>{member?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs">
                                      <Phone className="h-3 w-3" />
                                      <span>{member?.contactNo}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="hidden px-4 py-3 text-sm lg:table-cell">
                                  <div className="flex flex-wrap gap-1">
                                    {member?.memberships &&
                                      member?.memberships?.map((membership) => (
                                        <Badge
                                          key={membership.id}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {membership?.workspace?.name}
                                        </Badge>
                                      ))}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm flex gap-2">
                                  <Button
                                    variant="outline"
                                    className="hover:bg-gray-900 hover:text-white"
                                    size="icon"
                                    onClick={() => handleEdit(member)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="hover:bg-gray-900 hover:text-white"
                                    size="icon"
                                    onClick={() => handleDelete(member)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Permissions Settings */}
              <TabsContent value="permissions" className="pt-4">
                <PermissionSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
