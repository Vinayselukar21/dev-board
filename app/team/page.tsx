import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, Plus, Search } from "lucide-react"

// Team member data
const teamMembers = [
  {
    id: "1",
    name: "Alex Kim",
    role: "Project Manager",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    department: "Management",
    joinDate: "Jan 2021",
    projects: ["Website Redesign", "Social Media Campaign"],
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AK",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "UX Designer",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    department: "Design",
    joinDate: "Mar 2021",
    projects: ["Website Redesign", "Email Newsletter"],
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
    status: "active",
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "Content Strategist",
    email: "michael@example.com",
    phone: "+1 (555) 345-6789",
    department: "Marketing",
    joinDate: "Jun 2021",
    projects: ["Content Calendar", "Social Media Campaign"],
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MC",
    status: "active",
  },
  {
    id: "4",
    name: "Jessica Taylor",
    role: "Frontend Developer",
    email: "jessica@example.com",
    phone: "+1 (555) 456-7890",
    department: "Engineering",
    joinDate: "Feb 2022",
    projects: ["Website Redesign"],
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JT",
    status: "active",
  },
  {
    id: "5",
    name: "David Wilson",
    role: "SEO Specialist",
    email: "david@example.com",
    phone: "+1 (555) 567-8901",
    department: "Marketing",
    joinDate: "Apr 2022",
    projects: ["Website Redesign", "Content Calendar"],
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DW",
    status: "active",
  },
  {
    id: "6",
    name: "Emily Rodriguez",
    role: "Graphic Designer",
    email: "emily@example.com",
    phone: "+1 (555) 678-9012",
    department: "Design",
    joinDate: "Jul 2022",
    projects: ["Social Media Campaign", "Email Newsletter"],
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ER",
    status: "vacation",
  },
  {
    id: "7",
    name: "James Lee",
    role: "Backend Developer",
    email: "james@example.com",
    phone: "+1 (555) 789-0123",
    department: "Engineering",
    joinDate: "Sep 2022",
    projects: ["Website Redesign"],
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JL",
    status: "active",
  },
  {
    id: "8",
    name: "Olivia Martinez",
    role: "Marketing Coordinator",
    email: "olivia@example.com",
    phone: "+1 (555) 890-1234",
    department: "Marketing",
    joinDate: "Nov 2022",
    projects: ["Social Media Campaign", "Content Calendar"],
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "OM",
    status: "offline",
  },
]

export default function TeamPage() {
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
              <Button size="sm" className="h-8 gap-1">
                <Plus className="h-4 w-4" />
                Add Member
              </Button>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="flex flex-col gap-6">
              {/* Team Info */}
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Team Members</h2>
                <p className="text-muted-foreground">Manage your team members and their access to projects.</p>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Members</TabsTrigger>
                  <TabsTrigger value="management">Management</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="engineering">Engineering</TabsTrigger>
                  <TabsTrigger value="marketing">Marketing</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="pt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>All Team Members</CardTitle>
                      <CardDescription>View and manage all team members in your workspace.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-hidden rounded-lg border">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                              <th className="hidden px-4 py-3 text-left text-sm font-medium sm:table-cell">
                                Department
                              </th>
                              <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">Contact</th>
                              <th className="hidden px-4 py-3 text-left text-sm font-medium lg:table-cell">Projects</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {teamMembers.map((member) => (
                              <tr key={member.id} className="hover:bg-muted/50">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-3">
                                    <Avatar>
                                      <AvatarImage src={member.avatar} alt={member.name} />
                                      <AvatarFallback>{member.initials}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{member.name}</div>
                                      <div className="hidden text-xs text-muted-foreground sm:block md:hidden">
                                        {member.role}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">{member.role}</td>
                                <td className="hidden px-4 py-3 text-sm sm:table-cell">{member.department}</td>
                                <td className="hidden px-4 py-3 text-sm md:table-cell">
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1 text-xs">
                                      <Mail className="h-3 w-3" />
                                      <span>{member.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs">
                                      <Phone className="h-3 w-3" />
                                      <span>{member.phone}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="hidden px-4 py-3 text-sm lg:table-cell">
                                  <div className="flex flex-wrap gap-1">
                                    {member.projects.map((project) => (
                                      <Badge key={project} variant="outline" className="text-xs">
                                        {project}
                                      </Badge>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">
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
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="management" className="pt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Management Team</CardTitle>
                      <CardDescription>View and manage members in the Management department.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-hidden rounded-lg border">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                              <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">Contact</th>
                              <th className="hidden px-4 py-3 text-left text-sm font-medium lg:table-cell">Projects</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {teamMembers
                              .filter((member) => member.department === "Management")
                              .map((member) => (
                                <tr key={member.id} className="hover:bg-muted/50">
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback>{member.initials}</AvatarFallback>
                                      </Avatar>
                                      <div className="font-medium">{member.name}</div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-sm">{member.role}</td>
                                  <td className="hidden px-4 py-3 text-sm md:table-cell">
                                    <div className="flex flex-col gap-1">
                                      <div className="flex items-center gap-1 text-xs">
                                        <Mail className="h-3 w-3" />
                                        <span>{member.email}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-xs">
                                        <Phone className="h-3 w-3" />
                                        <span>{member.phone}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="hidden px-4 py-3 text-sm lg:table-cell">
                                    <div className="flex flex-wrap gap-1">
                                      {member.projects.map((project) => (
                                        <Badge key={project} variant="outline" className="text-xs">
                                          {project}
                                        </Badge>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-sm">
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
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Similar content for other tabs */}
                <TabsContent value="design" className="pt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Design Team</CardTitle>
                      <CardDescription>View and manage members in the Design department.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-hidden rounded-lg border">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                              <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">Contact</th>
                              <th className="hidden px-4 py-3 text-left text-sm font-medium lg:table-cell">Projects</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {teamMembers
                              .filter((member) => member.department === "Design")
                              .map((member) => (
                                <tr key={member.id} className="hover:bg-muted/50">
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback>{member.initials}</AvatarFallback>
                                      </Avatar>
                                      <div className="font-medium">{member.name}</div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-sm">{member.role}</td>
                                  <td className="hidden px-4 py-3 text-sm md:table-cell">
                                    <div className="flex flex-col gap-1">
                                      <div className="flex items-center gap-1 text-xs">
                                        <Mail className="h-3 w-3" />
                                        <span>{member.email}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-xs">
                                        <Phone className="h-3 w-3" />
                                        <span>{member.phone}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="hidden px-4 py-3 text-sm lg:table-cell">
                                    <div className="flex flex-wrap gap-1">
                                      {member.projects.map((project) => (
                                        <Badge key={project} variant="outline" className="text-xs">
                                          {project}
                                        </Badge>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-sm">
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
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Other department tabs would follow the same pattern */}
              </Tabs>
            </div>
          </div>
        </main>
      </div>
  )
}
