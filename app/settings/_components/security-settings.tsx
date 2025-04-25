import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Shield } from "lucide-react"
import { Globe } from "lucide-react"
import { Lock } from "lucide-react"

export default function SecuritySettings() {
    return (  <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security and authentication options.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Password</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="w-fit">Change Password</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable 2FA</Label>
                <div className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account.
                </div>
              </div>
              <Switch id="enable-2fa" />
            </div>
            <Button variant="outline" className="w-fit">
              <Shield className="mr-2 h-4 w-4" />
              Setup Two-Factor Authentication
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sessions</h3>
            <div className="rounded-md border">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Current Session</div>
                    <div className="text-sm text-muted-foreground">New York, USA · Chrome on macOS</div>
                  </div>
                </div>
                <Badge>Active Now</Badge>
              </div>
              <div className="flex items-center justify-between border-t p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Mobile App</div>
                    <div className="text-sm text-muted-foreground">New York, USA · iOS App</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Revoke
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-fit">
              <Lock className="mr-2 h-4 w-4" />
              Log Out of All Sessions
            </Button>
          </div>
        </CardContent>
      </Card>)
}