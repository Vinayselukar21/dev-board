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
import { AddProjectDialog } from "./_components/add-project-dialog";
import LoadingProjects from "./_components/loading-projects";

export default function Page() {
  const { projectData, projectsLoading, errorLoadingProjects } =
    useGetProjects();
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace);
const {projectLogsData, projectLogsLoading, errorLoadingProjectLogs} = useGetProjectLogs();

if(projectsLoading){
  return <LoadingProjects/>
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
          <AddProjectDialog
            trigger={
              <Button size="sm" className="h-8 gap-1">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            }
          />
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
              {/* <TabsTrigger value="settings">Settings</TabsTrigger> */}
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
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          <p>8 tasks in progress</p>
                          <p>3 tasks completed</p>
                        </div>
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground">
                        Updated 2 hours ago
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
                <AddProjectDialog
                  trigger={
                    <Card className="flex h-[180px] flex-col items-center justify-center border-dashed">
                      <div className="flex flex-col items-center gap-1 text-center">
                        <div className="rounded-full bg-background p-2.5 text-muted-foreground">
                          <Plus className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium">Create New Project</h3>
                        <p className="text-xs text-muted-foreground">
                          Add a new project to this workspace
                        </p>
                      </div>
                    </Card>
                  }
                />
              </div>
            </TabsContent>
            <TabsContent value="activity" className="pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recent Activity</h3>
                {projectLogsData?.map((log : Log) => (
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
                <div className="space-y-4">
                  {/* <div className="flex gap-4 rounded-lg border p-4">
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
                  <div className="flex gap-4 rounded-lg border p-4">
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
                  <div className="flex gap-4 rounded-lg border p-4">
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
              </div>
            </TabsContent>
            <TabsContent value="members" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <Button size="sm">Invite Member</Button>
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
                          {member?.role?.name.charAt(0).toUpperCase() + member?.role?.name.slice(1)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>
            {/* <TabsContent value="settings" className="pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Workspace Settings</h3>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label
                      htmlFor="workspace-name"
                      className="text-sm font-medium"
                    >
                      Workspace Name
                    </label>
                    <Input
                      id="workspace-name"
                      defaultValue="Marketing Team Workspace"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="workspace-description"
                      className="text-sm font-medium"
                    >
                      Description
                    </label>
                    <Input
                      id="workspace-description"
                      defaultValue="Collaborative workspace for all marketing projects and campaigns."
                    />
                  </div>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </main>
  );
}
