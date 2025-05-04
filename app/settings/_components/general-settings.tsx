'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import workspaceStore from "@/store/workspaceStore"

export default function GeneralSettings(){
    const { activeWorkspace } = workspaceStore.getState();
    return (
        <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your workspace name, description, and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Workspace Information</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="workspace-name">Workspace Name</Label>
                <Input id="workspace-name" defaultValue={activeWorkspace?.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="workspace-description">Description</Label>
                <Textarea
                  id="workspace-description"
                  defaultValue={activeWorkspace?.description}
                  className="min-h-[100px]"
                />
              </div>
              {/* <div className="grid gap-2">
                <Label htmlFor="workspace-url">Workspace URL</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">https://workspace.com/</span>
                  <Input id="workspace-url" defaultValue="marketing-team" className="flex-1" />
                </div>
              </div> */}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Preferences</h3>
            <div className="grid gap-4">
              {/* <div className="grid gap-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="america-new_york">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-new_york">America/New York (UTC-05:00)</SelectItem>
                    <SelectItem value="america-los_angeles">America/Los Angeles (UTC-08:00)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (UTC+00:00)</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+09:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable dark mode for the workspace interface.
                  </div>
                </div>
                <Switch id="dark-mode" />
              </div>
            </div>
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    )
}