"use client"

import { WorkspaceMember } from "@/app/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Department {
  id: string
  name: string
  [key: string]: any
}

interface DepartmentMembersDialogProps {
  trigger: React.ReactNode
  department: Department
  members: WorkspaceMember[]
}

export function DepartmentMembersDialog({trigger, department, members }: DepartmentMembersDialogProps) {
  // Helper function to get initials from name
  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{department.name} Department Members</DialogTitle>
          <DialogDescription>
            {members.length} {members.length === 1 ? "member" : "members"} in this department
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-4">
            {members.length === 0 ? (
              <div className="flex h-20 items-center justify-center rounded-lg border border-dashed">
                <p className="text-center text-muted-foreground">No members in this department yet.</p>
              </div>
            ) : (
              members.map((member) => (
                <div key={member.id} className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{getInitials(member.user.name!)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.user.name!}</p>
                      <p className="text-sm text-muted-foreground">{member.user.email}</p>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="flex flex-col gap-1 sm:mr-4">
                      <span className="text-sm font-medium">Role</span>
                      <Badge variant={member.role.name === "Owner" ? "default" : "outline"} className="w-fit">
                        {member.role.name}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">Job Title</span>
                      {/* <span className="text-sm text-muted-foreground">{member.jobTitle || "Not specified"}</span> */}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
