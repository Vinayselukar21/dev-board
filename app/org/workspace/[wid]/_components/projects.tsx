import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Workspace } from "@/app/types";
import { format } from "date-fns";
import { AddProjectDialog } from "./dialogs/add-project-dialog";
import { ProjectDetailsDialog } from "./dialogs/project-details-dialog";
import { ManageProjectTeamDialog } from "./dialogs/manage-project-team-dialog";

// Helper function to get initials from name
function getInitials(name: string | undefined) {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

// Helper function to format dates
function formatDate(dateString: string | Date | null | undefined) {
  if (!dateString) return "";
  return format(new Date(dateString), "MMM d, yyyy");
}

export default function Projects({
  workspaceData,
}: {
  workspaceData: Workspace;
}) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Workspace Projects</CardTitle>
            <CardDescription>
              Manage and track projects in this workspace
            </CardDescription>
          </div>
          <AddProjectDialog trigger={<Button size="sm">New Project</Button>} workspaceData={workspaceData} />
        </CardHeader>
        <CardContent>
          {workspaceData.projects.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
              <p className="text-center text-muted-foreground">
                No projects found. Create your first project.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {workspaceData?.projects?.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{project.name}</CardTitle>
                      <Badge
                        variant={
                          project.status === "active" ? "default" : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      Created on {formatDate(project.createdAt)} • Deadline:{" "}
                      {formatDate(project.deadline)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 text-sm font-medium">
                          Description
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {project.description || "No description provided."}
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium">
                          Team Members
                        </h4>
                        <div className="flex -space-x-2">
                          {project.members &&
                            project.members.map((projectMember) => (
                              <Avatar
                                key={projectMember.id}
                                className="border-2 border-background"
                              >
                                <AvatarFallback>
                                  {getInitials(projectMember.member.user.name!)}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <ProjectDetailsDialog trigger={<Button size="sm">View Details</Button>} project={project} />
                    <ManageProjectTeamDialog
                      project={project}
                      allMembers={workspaceData.members}
                      trigger={
                        <Button variant="outline" size="sm">
                          Manage Team
                        </Button>
                      }
                    />
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
