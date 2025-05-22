"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetWorkspaceMembers from "@/hooks/useGetWorkspaceMembers";
import workspaceStore from "@/store/workspaceStore";
import { Mail, Phone, Plus, Search } from "lucide-react";
import { useStore } from "zustand";
import LoadingTeams from "./_components/loading-teams";

export default function TeamPage() {
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace);
  const { memberData, membersLoading, errorLoadingMembers } =
    useGetWorkspaceMembers();
    if(membersLoading){
      return <LoadingTeams/>
    }
    
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <h1 className="text-lg font-semibold">Team</h1>
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
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Members</TabsTrigger>
                {activeWorkspace?.departments && activeWorkspace?.departments?.map((department) => (
                  <TabsTrigger key={department?.id} value={department?.id}>
                    {department?.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="all" className="pt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>All Team Members</CardTitle>
                    <CardDescription>
                      View and manage all team members in your workspace.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-lg border">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium">
                              Name
                            </th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">
                              Designation
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium">
                              Job Title
                            </th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium sm:table-cell">
                              Department
                            </th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">
                              Contact
                            </th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium lg:table-cell">
                              Projects
                            </th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">
                              Role
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {memberData && memberData.map((member) => (
                            <tr key={member?.id} className="hover:bg-muted/50">
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
                                      {member?.user?.name}
                                    </div>
                                    <div className="hidden text-xs text-muted-foreground sm:block md:hidden">
                                      {member.role.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="hidden px-4 py-3 text-sm md:table-cell">
                                {member.user.designation}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {member.user.jobTitle}
                              </td>
                              <td className="hidden px-4 py-3 text-sm sm:table-cell">
                                {member?.department?.name}
                              </td>
                              <td className="hidden px-4 py-3 text-sm md:table-cell">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-1 text-xs">
                                    <Mail className="h-3 w-3" />
                                    <span>{member?.user?.email}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs">
                                    <Phone className="h-3 w-3" />
                                    <span>{member?.user?.contactNo}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="hidden px-4 py-3 text-sm lg:table-cell">
                                <div className="flex flex-wrap gap-1">
                                  {member?.projects && member.projects?.map((project) => (
                                    <Badge
                                      key={project.id}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {project?.project?.name}
                                    </Badge>
                                  ))}
                                </div>
                              </td>
                              <td className="hidden px-4 py-3 text-sm md:table-cell">
                                {member.role.name}
                              </td>
                              {/* <td className="px-4 py-3 text-sm">
                                <Badge
                                  className={
                                    member.status === "active"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : member.status === "vacation"
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                  }
                                >
                                  {member.status}
                                </Badge>
                              </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {activeWorkspace?.departments && activeWorkspace?.departments?.map((department) => (
                <TabsContent
                  value={department?.id}
                  className="pt-4"
                  key={department?.id}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>{department?.name} Team</CardTitle>
                      <CardDescription>
                        View and manage members in the {department?.name}{" "}
                        department.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-hidden rounded-lg border">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium">
                                Name
                              </th>
                              <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">
                                Designation
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium">
                                Job Title
                              </th>
                              <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">
                                Contact
                              </th>
                              <th className="hidden px-4 py-3 text-left text-sm font-medium lg:table-cell">
                                Projects
                              </th>
                              <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">
                                Role
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {memberData && memberData
                              ?.filter(
                                (member) =>
                                  member?.department?.id === department?.id
                              )
                              .map((member) => (
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
                                          {member?.user?.name}
                                        </div>
                                        <div className="hidden text-xs text-muted-foreground sm:block md:hidden">
                                          {member.role.name}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="hidden px-4 py-3 text-sm md:table-cell">
                                    {member.user.designation}
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                    {member.user.jobTitle}
                                  </td>
                                  <td className="hidden px-4 py-3 text-sm md:table-cell">
                                    <div className="flex flex-col gap-1">
                                      <div className="flex items-center gap-1 text-xs">
                                        <Mail className="h-3 w-3" />
                                        <span>{member?.user?.email}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-xs">
                                        <Phone className="h-3 w-3" />
                                        <span>{member?.user?.contactNo}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="hidden px-4 py-3 text-sm lg:table-cell">
                                    <div className="flex flex-wrap gap-1">
                                      {member.projects && member.projects?.map((project) => (
                                        <Badge
                                          key={project?.id}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {project?.project?.name}
                                        </Badge>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="hidden px-4 py-3 text-sm md:table-cell">
                                    {member.role.name}
                                  </td>
                                  {/* <td className="px-4 py-3 text-sm">
                                <Badge
                                  className={
                                    member.status === "active"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : member.status === "vacation"
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                  }
                                >
                                  {member.status}
                                </Badge>
                              </td> */}
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
