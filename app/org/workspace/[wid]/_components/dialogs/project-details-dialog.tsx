"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { Calendar, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"
import { Project } from "@/app/types"


interface ProjectDetailsDialogProps {
  trigger: React.ReactNode
  project: Project
}

export function ProjectDetailsDialog({ trigger, project }: ProjectDetailsDialogProps) {
  // Helper function to get initials from name
  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  // Helper function to format dates
  function formatDate(dateString: string) {
    return format(new Date(dateString), "MMM d, yyyy")
  }

  // Calculate days remaining until deadline
  const daysRemaining = () => {
    const today = new Date()
    const deadline = new Date(project.deadline!)
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const remainingDays = daysRemaining()

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{project.name}</DialogTitle>
            <Badge variant={project.status === "active" ? "default" : "outline"}>{project.status}</Badge>
          </div>
          <DialogDescription>Project details and team members</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[500px] pr-4">
          <div className="space-y-6">
            {/* Project Info */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">{project.description || "No description provided."}</p>
            </div>

            {/* Project Timeline */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Timeline</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-2 rounded-md border p-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Created On</p>
                    <p className="text-sm font-medium">{formatDate(project.createdAt!.toString())}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-md border p-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Deadline</p>
                    <p className="text-sm font-medium">{formatDate(project.deadline!.toString() || "")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-md border p-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time Remaining</p>
                    <p
                      className={`text-sm font-medium ${remainingDays < 0 ? "text-destructive" : remainingDays < 7 ? "text-amber-500" : ""}`}
                    >
                      {remainingDays < 0
                        ? `${Math.abs(remainingDays)} days overdue`
                        : remainingDays === 0
                          ? "Due today"
                          : `${remainingDays} days remaining`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Team Members */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Team Members</h3>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{project.members?.length} members</span>
                </div>
              </div>

              <div className="space-y-3">
                {project.members?.map((projectMember) => (
                  <div key={projectMember.id} className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(projectMember.member.user.name!)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{projectMember.member.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {"No job title"}
                        </p>
                      </div>
                    </div>
                    <Badge variant={projectMember.member.role.name === "Owner" ? "default" : "outline"}>
                      {projectMember.member.role.name}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Activity - Placeholder for future implementation */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recent Activity</h3>
              <div className="rounded-md border border-dashed p-6 text-center">
                <p className="text-sm text-muted-foreground">Project activity tracking will be available soon.</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
