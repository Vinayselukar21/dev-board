"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  CheckCircle2,
  Clock,
  FolderKanban,
  LineChart,
  Search,
  Settings,
  StickyNote,
  User,
  Users,
} from "lucide-react";
import { useAuth } from "../providers/AuthProvider";
import useGetDashboard from "@/hooks/useGetDashboard";
import { Log } from "../types";
import { format } from "date-fns";
import LoadingDashboard from "./_components/loading-dashboard";

export default function Page() {
  const { session } = useAuth();
  const { dashboardData, dashboardLoading, errorLoadingDashboard } =
    useGetDashboard();
    if(dashboardLoading){
      return <LoadingDashboard/>
    }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="ml-auto flex items-center gap-2">
            <form className="hidden sm:flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-60 rounded-lg border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </form>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="flex flex-col gap-6">
            {/* Welcome Section */}
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">
                Good morning, {session?.name}
              </h2>
              <p className="text-muted-foreground">
                Here's what's happening in your workspace today.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Projects
                  </CardTitle>
                  <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData?.projectCard?.count}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tasks Completed
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData?.taskCard?.completedTaskCount}
                  </div>
                  <p className="text-xs text-muted-foreground">+12 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Team Members
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData?.teamCard?.count}
                  </div>
                  <p className="text-xs text-muted-foreground">+1 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Hours Tracked
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">164</div>
                  <p className="text-xs text-muted-foreground">
                    +28 from last week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Project Progress */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-full lg:col-span-2">
                <CardHeader>
                  <CardTitle>Project Progress</CardTitle>
                  <CardDescription>
                    Track the progress of your active projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData?.projectProgressCard?.map((project: any) => (
                      <div className="space-y-2" key={project.id}>
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">
                            {project?.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {project?.progress?.percentage}%
                          </div>
                        </div>
                        <Progress value={project?.progress?.percentage} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Task Distribution</CardTitle>
                  <CardDescription>Tasks by status</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <LineChart className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <div className="text-sm">Completed: 22</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                        <div className="text-sm">In Progress: 15</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <div className="text-sm">To Do: 34</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Upcoming */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity </CardTitle>
                  <CardDescription>
                    Latest updates from your workspace
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData?.logsCard?.map((log: Log)=>{ return (<div className="flex gap-4" key={log.id}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {log.type === "user" && <User  className="h-4 w-4" />}
                        {log.type === "workspace" && <Users className="h-4 w-4" />}
                        {log.type === "task" && <StickyNote className="h-4 w-4" />}
                        {log.type === "project" && <FolderKanban className="h-4 w-4" />}
                        {log.type === "setting" && <Settings className="h-4 w-4" />}
                        {log.type === "calendarEvent" && <Calendar className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {log.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(log.createdAt , "dd MMM yyyy - hh:mm")}
                        </p>
                      </div>
                    </div>)})}
                    {/* <div className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Alex Kim added 2 new team members
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                   <div className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <FolderKanban className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Sarah created "Social Media Campaign" project
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Yesterday at 4:30 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Michael completed "User interviews" task
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Yesterday at 2:15 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Settings className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Workspace settings updated
                        </p>
                        <p className="text-xs text-muted-foreground">
                          3 days ago
                        </p>
                      </div>
                    </div> */}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Tasks due soon</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Create wireframes</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <FolderKanban className="h-3 w-3" />
                          <span>Website Redesign</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                        <Clock className="h-3 w-3" />
                        <span>Tomorrow</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">User interviews</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <FolderKanban className="h-3 w-3" />
                          <span>Website Redesign</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                        <Clock className="h-3 w-3" />
                        <span>In 3 days</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Content inventory</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <FolderKanban className="h-3 w-3" />
                          <span>Content Calendar</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                        <Clock className="h-3 w-3" />
                        <span>In 5 days</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">SEO audit</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <FolderKanban className="h-3 w-3" />
                          <span>Website Redesign</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        <Clock className="h-3 w-3" />
                        <span>In 7 days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
