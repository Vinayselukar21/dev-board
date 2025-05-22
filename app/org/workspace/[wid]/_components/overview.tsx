import { Workspace } from "@/app/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Briefcase, Building2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

export default function Overview({
  workspaceData,
}: {
  workspaceData: Workspace;
}) {
  return (
    <>
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
            <CardDescription>
              Latest members to join the workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workspaceData.members.slice(0, 3).map((member) => (
                <div key={member.id} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {getInitials(member?.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{member?.user?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member?.user?.jobTitle || "No job title"}
                    </p>
                  </div>
                  <Badge
                    variant={
                      member?.role.name === "Owner" ? "default" : "outline"
                    }
                  >
                    {member?.role.name}
                  </Badge>
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
            <CardDescription>
              Current projects in this workspace
            </CardDescription>
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
                    <p className="text-sm text-muted-foreground">
                      Deadline: {formatDate(project.deadline)}
                    </p>
                  </div>
                  <Badge
                    variant={
                      project.status === "active" ? "default" : "outline"
                    }
                  >
                    {project.status}
                  </Badge>
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
    </>
  );
}
