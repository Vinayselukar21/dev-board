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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Upload } from "lucide-react"
import workspaceStore from "@/store/workspaceStore"

interface CreateWorkspaceDialogProps {
  trigger?: React.ReactNode
}

export function CreateWorkspaceDialog({ trigger }: CreateWorkspaceDialogProps) {
  const { activeWorkspace:workspaces } = workspaceStore.getState()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)

  // Form state
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [workspaceType, setWorkspaceType] = useState("team")
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [inviteEmails, setInviteEmails] = useState("")
  const [templateId, setTemplateId] = useState("")

  // Sample templates
  const templates = [
    { id: "blank", name: "Blank Workspace", description: "Start from scratch with an empty workspace" },
    { id: "marketing", name: "Marketing Team", description: "Templates for marketing campaigns and content planning" },
    { id: "design", name: "Design Team", description: "Templates for design projects and asset management" },
    { id: "engineering", name: "Engineering Team", description: "Templates for software development and sprints" },
    { id: "product", name: "Product Team", description: "Templates for product roadmaps and feature planning" },
  ]

  // Handle file upload for logo
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle workspace creation logic here
    // Reset form and close dialog
    setName("")
    setDescription("")
    setWorkspaceType("team")
    setLogoPreview(null)
    setInviteEmails("")
    setTemplateId("")
    setStep(1)
    setOpen(false)
  }

  // Go to next step
  const nextStep = () => {
    setStep(step + 1)
  }

  // Go to previous step
  const prevStep = () => {
    setStep(step - 1)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full justify-start gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Workspace
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Workspace</DialogTitle>
            <DialogDescription>Set up a new workspace for your team to collaborate on projects.</DialogDescription>
          </DialogHeader>

          {/* Step indicators */}
          <div className="my-4 flex items-center justify-center">
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                1
              </div>
              <div className={`h-1 w-10 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                2
              </div>
              <div className={`h-1 w-10 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                3
              </div>
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted">
                    {logoPreview ? (
                      <div className="h-full w-full overflow-hidden rounded-md">
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Workspace logo preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleLogoChange}
                  />
                  <Label
                    htmlFor="logo-upload"
                    className="absolute -bottom-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground"
                  >
                    +
                  </Label>
                </div>
                <div className="grid w-full gap-2">
                  <Label htmlFor="workspace-name">Workspace Name</Label>
                  <Input
                    id="workspace-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter workspace name"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="workspace-description">Description</Label>
                <Textarea
                  id="workspace-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the purpose of this workspace"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="workspace-type">Workspace Type</Label>
                <Select value={workspaceType} onValueChange={setWorkspaceType}>
                  <SelectTrigger id="workspace-type">
                    <SelectValue placeholder="Select workspace type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="team">Team Workspace</SelectItem>
                    <SelectItem value="personal">Personal Workspace</SelectItem>
                    <SelectItem value="client">Client Workspace</SelectItem>
                    <SelectItem value="project">Project Workspace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Choose Template */}
          {step === 2 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Choose a Template</Label>
                <p className="text-sm text-muted-foreground">
                  Select a template to start with or create a blank workspace.
                </p>

                <div className="mt-2 grid gap-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 transition-colors hover:bg-muted/50 ${
                        templateId === template.id ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setTemplateId(template.id)}
                    >
                      <Checkbox
                        checked={templateId === template.id}
                        onCheckedChange={() => setTemplateId(template.id)}
                      />
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Invite Team Members */}
          {step === 3 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="invite-emails">Invite Team Members (Optional)</Label>
                <Textarea
                  id="invite-emails"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  placeholder="Enter email addresses (one per line or separated by commas)"
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                  Enter multiple email addresses separated by commas or on new lines.
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Default Role for Invitees</Label>
                <Select defaultValue="member">
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 rounded-md bg-muted/50 p-3">
                <h4 className="font-medium">You'll be able to invite more people later</h4>
                <p className="text-sm text-muted-foreground">
                  You can always add more team members after creating your workspace.
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="mt-6">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={nextStep}>
                Continue
              </Button>
            ) : (
              <Button type="button">Create Workspace</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
