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
import { Workspace } from "@/app/types";
import { Button } from "@/components/ui/button";
import { AddMembersDialog } from "./dialogs/add-members-dialog";

// Helper function to get initials from name
function getInitials(name: string | undefined) {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

export default function Members({
    workspaceData,
}: {
    workspaceData: Workspace;
}) {
    return (
        <>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Workspace Members</CardTitle>
                <CardDescription>Manage members and their roles in this workspace</CardDescription>
              </div>
              <AddMembersDialog workspaceData={workspaceData} trigger={<Button size="sm">Invite Members</Button>} departments={workspaceData.departments || []} />
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
        </>
    )
}