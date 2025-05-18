'use client';
import { AudioWaveform, Calendar, Users, Briefcase, Building2, BookOpen, Bot, Command, Frame, GalleryVerticalEnd, Map, PieChart, Settings2, SquareTerminal } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { useAuth } from "@/app/providers/AuthProvider";
import { useStore } from "zustand";
import workspaceStore from "@/store/workspaceStore";
import organizationStore from "@/store/organizationStore";
import { useParams } from "next/navigation";
import { Workspace } from "@/app/types";
import { icons } from "@/components/workspace-switcher";
// Mock data - in a real app, this would come from an API or database
// const workspaceData = {
//   id: "cmagmn9kw0001cdscku581wdv",
//   icon: "AudioWaveform",
//   name: "Next Js Team Workspace",
//   description: "The workspace consists of Next js team and projects",
//   createdAt: "2025-05-09T10:02:09.270Z",
//   updatedAt: "2025-05-09T10:02:09.270Z",
//   ownerId: "99a62e34-8e7c-4954-a8ae-c4f9901c5158",
//   organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//   members: [
//     {
//       id: "cmagmn9kw0003cdscgmqddyvw",
//       role: "admin",
//       invitedAt: "2025-05-09T10:02:09.270Z",
//       accepted: false,
//       jobTitle: "",
//       userId: "99a62e34-8e7c-4954-a8ae-c4f9901c5158",
//       workspaceId: "cmagmn9kw0001cdscku581wdv",
//       departmentId: null,
//       organizationId: null,
//       user: {
//         id: "99a62e34-8e7c-4954-a8ae-c4f9901c5158",
//         email: "christopher@wakare.com",
//         name: "Christopher Wakare",
//         password: "$2b$10$A3ZueSHA0KjqAwvLOWU0juKtbNR4/sp2HKkIbX2i6JDYG0SkDBUmq",
//         role: "admin",
//         createdAt: "2025-05-09T10:00:33.652Z",
//         updatedAt: "2025-05-09T10:00:34.114Z",
//         contactNo: "1234567890",
//         location: "Thane, Mumbai",
//         isVerified: false,
//         lastLogin: null,
//         organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//       },
//     },
//     {
//       id: "cmagmpe440003cdd8wqn23szp",
//       role: "member",
//       invitedAt: "2025-05-09T10:03:48.532Z",
//       accepted: false,
//       jobTitle: "Fullstack Developer",
//       userId: "2523aae5-a203-412c-a067-9df89b4cf314",
//       workspaceId: "cmagmn9kw0001cdscku581wdv",
//       departmentId: "cmagmnkfk000bcdscra3wpxsf",
//       organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//       user: {
//         id: "2523aae5-a203-412c-a067-9df89b4cf314",
//         email: "vinay@selukar.com",
//         name: "Vinay Selukar",
//         password: "$2b$10$VosJvnWalpExowInrAq5y.hgk6yklUMHHPCp2tfzFr6wZdzaZz6Vy",
//         role: "user",
//         createdAt: "2025-05-09T10:03:48.532Z",
//         updatedAt: "2025-05-09T10:03:48.532Z",
//         contactNo: "7709428041",
//         location: "Nagpur",
//         isVerified: false,
//         lastLogin: null,
//         organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//       },
//     },
//     {
//       id: "cmarvdf1g0003cd9cnj8djqjj",
//       role: "member",
//       invitedAt: "2025-05-17T06:51:54.276Z",
//       accepted: false,
//       jobTitle: "Backend Developer",
//       userId: "4a52061f-f78c-4ffa-a1d6-418dae0c3a5b",
//       workspaceId: "cmagmn9kw0001cdscku581wdv",
//       departmentId: "cmagmnkfk000bcdscra3wpxsf",
//       organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//       user: {
//         id: "4a52061f-f78c-4ffa-a1d6-418dae0c3a5b",
//         email: "mustafa@ansari.com",
//         name: "Mustafa Ansari",
//         password: "$2b$10$axT2OVu2NVFly8xWc7xyfOAO0DZeHl19gxfBcBNaX/KaMg/OAjBkm",
//         role: "user",
//         createdAt: "2025-05-17T06:51:54.276Z",
//         updatedAt: "2025-05-17T06:51:54.276Z",
//         contactNo: "14567890654",
//         location: "Shambhaji Nagar",
//         isVerified: false,
//         lastLogin: null,
//         organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//       },
//     },
//   ],
//   projects: [
//     {
//       id: "cmarxyg2z0001cdbcs5dj1hpy",
//       name: "VG Admin",
//       description: "",
//       status: "active",
//       deadline: "2025-06-20T18:30:00.000Z",
//       createdAt: "2025-05-17T08:04:14.637Z",
//       updatedAt: "2025-05-17T08:04:14.637Z",
//       workspaceId: "cmagmn9kw0001cdscku581wdv",
//       createdById: "99a62e34-8e7c-4954-a8ae-c4f9901c5158",
//       members: [
//         {
//           id: "cmarxyg300003cdbc21dn2a53",
//           projectId: "cmarxyg2z0001cdbcs5dj1hpy",
//           memberId: "cmagmn9kw0003cdscgmqddyvw",
//           assignedAt: "2025-05-17T08:04:14.637Z",
//           member: {
//             id: "cmagmn9kw0003cdscgmqddyvw",
//             role: "admin",
//             invitedAt: "2025-05-09T10:02:09.270Z",
//             accepted: false,
//             jobTitle: "",
//             userId: "99a62e34-8e7c-4954-a8ae-c4f9901c5158",
//             workspaceId: "cmagmn9kw0001cdscku581wdv",
//             departmentId: null,
//             organizationId: null,
//             user: {
//               id: "99a62e34-8e7c-4954-a8ae-c4f9901c5158",
//               email: "christopher@wakare.com",
//               name: "Christopher Wakare",
//               password: "$2b$10$A3ZueSHA0KjqAwvLOWU0juKtbNR4/sp2HKkIbX2i6JDYG0SkDBUmq",
//               role: "admin",
//               createdAt: "2025-05-09T10:00:33.652Z",
//               updatedAt: "2025-05-09T10:00:34.114Z",
//               contactNo: "1234567890",
//               location: "Thane, Mumbai",
//               isVerified: false,
//               lastLogin: null,
//               organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//             },
//           },
//         },
//         {
//           id: "cmarxyg300004cdbcsg9awhbr",
//           projectId: "cmarxyg2z0001cdbcs5dj1hpy",
//           memberId: "cmagmpe440003cdd8wqn23szp",
//           assignedAt: "2025-05-17T08:04:14.637Z",
//           member: {
//             id: "cmagmpe440003cdd8wqn23szp",
//             role: "member",
//             invitedAt: "2025-05-09T10:03:48.532Z",
//             accepted: false,
//             jobTitle: "Fullstack Developer",
//             userId: "2523aae5-a203-412c-a067-9df89b4cf314",
//             workspaceId: "cmagmn9kw0001cdscku581wdv",
//             departmentId: "cmagmnkfk000bcdscra3wpxsf",
//             organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//             user: {
//               id: "2523aae5-a203-412c-a067-9df89b4cf314",
//               email: "vinay@selukar.com",
//               name: "Vinay Selukar",
//               password: "$2b$10$VosJvnWalpExowInrAq5y.hgk6yklUMHHPCp2tfzFr6wZdzaZz6Vy",
//               role: "user",
//               createdAt: "2025-05-09T10:03:48.532Z",
//               updatedAt: "2025-05-09T10:03:48.532Z",
//               contactNo: "7709428041",
//               location: "Nagpur",
//               isVerified: false,
//               lastLogin: null,
//               organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//             },
//           },
//         },
//         {
//           id: "cmarxyg310005cdbc68yedods",
//           projectId: "cmarxyg2z0001cdbcs5dj1hpy",
//           memberId: "cmarvdf1g0003cd9cnj8djqjj",
//           assignedAt: "2025-05-17T08:04:14.637Z",
//           member: {
//             id: "cmarvdf1g0003cd9cnj8djqjj",
//             role: "member",
//             invitedAt: "2025-05-17T06:51:54.276Z",
//             accepted: false,
//             jobTitle: "Backend Developer",
//             userId: "4a52061f-f78c-4ffa-a1d6-418dae0c3a5b",
//             workspaceId: "cmagmn9kw0001cdscku581wdv",
//             departmentId: "cmagmnkfk000bcdscra3wpxsf",
//             organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//             user: {
//               id: "4a52061f-f78c-4ffa-a1d6-418dae0c3a5b",
//               email: "mustafa@ansari.com",
//               name: "Mustafa Ansari",
//               password: "$2b$10$axT2OVu2NVFly8xWc7xyfOAO0DZeHl19gxfBcBNaX/KaMg/OAjBkm",
//               role: "user",
//               createdAt: "2025-05-17T06:51:54.276Z",
//               updatedAt: "2025-05-17T06:51:54.276Z",
//               contactNo: "14567890654",
//               location: "Shambhaji Nagar",
//               isVerified: false,
//               lastLogin: null,
//               organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//             },
//           },
//         },
//       ],
//     },
//   ],
//   departments: [
//     {
//       id: "cmagmngn60007cdsc5t7bhsyc",
//       workspaceId: "cmagmn9kw0001cdscku581wdv",
//       name: "Management",
//       createdAt: "2025-05-09T10:02:18.498Z",
//       updatedAt: "2025-05-09T10:02:18.498Z",
//     },
//     {
//       id: "cmagmnkfk000bcdscra3wpxsf",
//       workspaceId: "cmagmn9kw0001cdscku581wdv",
//       name: "Engineering",
//       createdAt: "2025-05-09T10:02:23.408Z",
//       updatedAt: "2025-05-09T10:02:23.408Z",
//     },
//     {
//       id: "cmagmnr5j000fcdsc0jshj4x2",
//       workspaceId: "cmagmn9kw0001cdscku581wdv",
//       name: "Sales & Marketing",
//       createdAt: "2025-05-09T10:02:32.049Z",
//       updatedAt: "2025-05-09T10:02:32.049Z",
//     },
//     {
//       id: "cmagmnudq000jcdscylw7v6pk",
//       workspaceId: "cmagmn9kw0001cdscku581wdv",
//       name: "Design",
//       createdAt: "2025-05-09T10:02:36.303Z",
//       updatedAt: "2025-05-09T10:02:36.303Z",
//     },
//   ],
// }

// Helper function to get initials from name
function getInitials(name: string | undefined) {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

// Helper function to format dates
function formatDate(dateString: string | Date | null | undefined) {
  if (!dateString) return "";
  return format(new Date(dateString), "MMM d, yyyy")
}

export default function WorkspaceDashboard() {
 const params = useParams();
  const activeOrganization = useStore(
    organizationStore,
    (state) => state.activeOrganization
  );

  const workspaceData: Workspace | undefined = activeOrganization?.workspaces?.find(
    (workspace) => workspace.id === params.wid
  );

  if (!workspaceData) {
    return <div>Workspace not found</div>;
  }
  const WorkspaceIcon = icons.find((icon) => icon.label === workspaceData.icon)?.icon
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            {WorkspaceIcon ?  <WorkspaceIcon className="size-6" /> : ""}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{workspaceData.name}</h1>
            <p className="text-muted-foreground">{workspaceData.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Edit Workspace
          </Button>
          <Button size="sm">Invite Members</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Created On</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(workspaceData.createdAt)}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{workspaceData.members.length}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{workspaceData.projects.length}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Departments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{workspaceData.departments.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Members</CardTitle>
                <CardDescription>Latest members to join the workspace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workspaceData.members.slice(0, 3).map((member) => (
                    <div key={member.id} className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{getInitials(member?.user?.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{member?.user?.name}</p>
                        <p className="text-sm text-muted-foreground">{member?.user?.jobTitle || "No job title"}</p>
                      </div>
                      <Badge variant={member?.role.name === "Owner" ? "default" : "outline"}>{member?.role.name}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  View All Members
                </Button>
              </CardFooter>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>Current projects in this workspace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workspaceData.projects.map((project) => (
                    <div key={project.id} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">Deadline: {formatDate(project.deadline)}</p>
                      </div>
                      <Badge variant={project.status === "active" ? "default" : "outline"}>{project.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  View All Projects
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Members</CardTitle>
              <CardDescription>Manage members and their roles in this workspace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {workspaceData.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{getInitials(member?.user?.name!)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member?.user?.name}</p>
                        <p className="text-sm text-muted-foreground">{member?.user?.email}</p>
                      </div>
                    </div>
                    <div className="ml-auto flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex flex-col gap-1 sm:mr-4">
                        <span className="text-sm font-medium">Role</span>
                        <Badge variant={member?.role.name === "Owner" ? "default" : "outline"} className="w-fit">
                          {member?.role.name}
                        </Badge>
                      </div>
                      <div className="flex flex-col gap-1 sm:mr-4">
                        <span className="text-sm font-medium">Job Title</span>
                        <span className="text-sm text-muted-foreground">{member?.user?.jobTitle || "Not specified"}</span>
                      </div>
                      <div className="flex flex-col gap-1 sm:mr-4">
                        <span className="text-sm font-medium">Location</span>
                        <span className="text-sm text-muted-foreground">{member?.user?.location}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Department</span>
                        <span className="text-sm text-muted-foreground">
                          {member.departmentId
                            ? workspaceData.departments.find((d) => d.id === member.departmentId)?.name
                            : "Not assigned"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Workspace Projects</CardTitle>
                <CardDescription>Manage and track projects in this workspace</CardDescription>
              </div>
              <Button size="sm">New Project</Button>
            </CardHeader>
            <CardContent>
              {workspaceData.projects.length === 0 ? (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-muted-foreground">No projects found. Create your first project.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {workspaceData.projects.map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{project.name}</CardTitle>
                          <Badge variant={project.status === "active" ? "default" : "outline"}>{project.status}</Badge>
                        </div>
                        <CardDescription>
                          Created on {formatDate(project.createdAt)} • Deadline: {formatDate(project.deadline)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="mb-2 text-sm font-medium">Description</h4>
                            <p className="text-sm text-muted-foreground">
                              {project.description || "No description provided."}
                            </p>
                          </div>
                          <div>
                            <h4 className="mb-2 text-sm font-medium">Team Members</h4>
                            <div className="flex -space-x-2">
                              {project.members && project.members.map((projectMember) => (
                                <Avatar key={projectMember.id} className="border-2 border-background">
                                  <AvatarFallback>{getInitials(projectMember.member.user.name!)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Manage Team
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Workspace Departments</CardTitle>
                <CardDescription>Manage departments and team structure</CardDescription>
              </div>
              <Button size="sm">Add Department</Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {workspaceData.departments.map((department) => {
                  // Count members in this department
                  const memberCount = workspaceData.members.filter(
                    (member) => member.departmentId === department.id,
                  ).length

                  return (
                    <Card key={department.id}>
                      <CardHeader className="pb-2">
                        <CardTitle>{department.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{memberCount} members</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Created {formatDate(department.createdAt?.toString() || "")}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm" className="w-full">
                          View Members
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
