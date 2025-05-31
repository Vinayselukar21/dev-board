"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetProjectLogs from "@/hooks/useGetProjectLogs";
import useGetProjects from "@/hooks/useGetProjects";
import workspaceStore from "@/store/workspaceStore";
import { format } from "date-fns";
import { Plus, Search, Users } from "lucide-react";
import Link from "next/link";
import { useStore } from "zustand";
import { Log } from "../types";
import LoadingProjects from "./_components/loading-projects";
import useGetProjectStats from "@/hooks/useGetProjectStats";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const { projectData, projectsLoading, errorLoadingProjects } =
    useGetProjects();

  const { projectStatsData, projectStatsLoading, errorLoadingProjectStats } = useGetProjectStats();
  console.log(projectStatsData, "projectStatsData");
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace);
  const { projectLogsData, projectLogsLoading, errorLoadingProjectLogs } = useGetProjectLogs();
  console.log(projectData, "projectData");
  if (projectsLoading) {
    return <LoadingProjects />
  }
  return (
    <main className="flex flex-1 flex-col">
      {/* Header */}
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
        <h1 className="text-lg font-semibold">Projects</h1>
        <div className="ml-auto flex items-center gap-2">
          <form className="hidden sm:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
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
          <Tabs defaultValue="projects">
            <TabsList>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>
            <TabsContent value="projects" className="pt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Project Cards */}
                {projectData?.map((project) => (
                  <Link
                    href={`/projects/${project.id}`}
                    className="group"
                    key={project?.id}
                  >
                    <Card className="transition-all hover:border-primary/50 hover:shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 justify-between">{project.name} {projectStatsData[project.id] && <Badge className={projectStatsData[project.id].projectStatus === "active" ? "border-green-500 text-green-500 bg-green-100" : "border-red-500 text-red-500 bg-red-100"}>{projectStatsData[project.id].projectStatus}</Badge>}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium text-muted-foreground">Tasks</p>
                        {projectStatsLoading ? <div className="text-sm text-muted-foreground">
                          <p>Loading...</p>
                        </div> : <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          {projectStatsData[project.id].taskStages.length === 0 ? <p>No tasks found</p> : projectStatsData[project.id].taskStages?.map((stage) => <p className="flex items-center gap-2" key={stage.id}>{stage.name}: {stage.tasksCount}</p>)}
                        </div>}
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground">
                        {projectStatsData[project.id] && projectStatsData[project.id].membersCount} members
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="activity" className="pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recent Activity</h3>
                {projectLogsData?.map((log: Log) => (
                  <div className="flex gap-4 rounded-lg border p-4" key={log.id}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {log.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(log.createdAt!, "dd MMM yyyy - hh:mm")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="members" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Team Members</h3>
                </div>
                <div className="space-y-2">
                  {activeWorkspace.members &&
                    activeWorkspace.members.map((member) => (
                      <div className="flex items-center justify-between rounded-lg border p-3" key={member.id}>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-muted"></div>
                          <div>
                            <p className="font-medium">{member.user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {member.user.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {member?.role?.name?.charAt(0).toUpperCase() + member?.role?.name?.slice(1)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
