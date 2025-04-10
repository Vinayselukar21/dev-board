"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Plus, X } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Sample team members data
const teamMembers = [
  { id: "1", name: "Alex Kim", initials: "AK", role: "Project Manager" },
  { id: "2", name: "Sarah Johnson", initials: "SJ", role: "UX Designer" },
  { id: "3", name: "Michael Chen", initials: "MC", role: "Content Strategist" },
  { id: "4", name: "Jessica Taylor", initials: "JT", role: "Frontend Developer" },
  { id: "5", name: "David Wilson", initials: "DW", role: "SEO Specialist" },
]

interface AddProjectDialogProps {
  trigger?: React.ReactNode
}

export function AddProjectDialog({ trigger }: AddProjectDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [dueDate, setDueDate] = useState<Date>()

  const toggleMember = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId))
    } else {
      setSelectedMembers([...selectedMembers, memberId])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle project creation logic here
    setOpen(false)
    // Reset form
    setSelectedMembers([])
    setDueDate(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="h-8 gap-1">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Add a new project to your workspace.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input id="project-name" placeholder="Enter project name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                placeholder="Describe the project and its goals"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="project-category">Category</Label>
                <Select>
                  <SelectTrigger id="project-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Team Members</Label>
              <div className="flex flex-wrap gap-2">
                {selectedMembers.length > 0 ? (
                  selectedMembers.map((memberId) => {
                    const member = teamMembers.find((m) => m.id === memberId)
                    if (!member) return null
                    return (
                      <Badge key={member.id} variant="secondary" className="flex items-center gap-1">
                        {member.name}
                        <button
                          type="button"
                          onClick={() => toggleMember(member.id)}
                          className="ml-1 rounded-full p-0.5 hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {member.name}</span>
                        </button>
                      </Badge>
                    )
                  })
                ) : (
                  <div className="text-sm text-muted-foreground">No team members selected</div>
                )}
              </div>
              <div className="mt-2 max-h-[150px] overflow-y-auto rounded-md border p-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2 py-2">
                    <Checkbox
                      id={`member-${member.id}`}
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={() => toggleMember(member.id)}
                    />
                    <Label
                      htmlFor={`member-${member.id}`}
                      className="flex flex-1 cursor-pointer items-center gap-2 text-sm font-normal"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px]">{member.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-1 justify-between">
                        <span>{member.name}</span>
                        <span className="text-xs text-muted-foreground">{member.role}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
