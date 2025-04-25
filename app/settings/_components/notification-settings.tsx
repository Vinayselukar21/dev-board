import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function NotificationSettings() {
    return (<Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage how and when you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Project Updates</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive emails about project changes and updates.
                  </div>
                </div>
                <Switch id="email-projects" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Assignments</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive emails when you are assigned to a task.
                  </div>
                </div>
                <Switch id="email-tasks" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Team Announcements</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive emails about team announcements.
                  </div>
                </div>
                <Switch id="email-announcements" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digest</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive a weekly summary of workspace activity.
                  </div>
                </div>
                <Switch id="email-digest" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">In-App Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Comments</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications when someone comments on your tasks.
                  </div>
                </div>
                <Switch id="app-comments" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Due Date Reminders</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications about upcoming due dates.
                  </div>
                </div>
                <Switch id="app-due-dates" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mentions</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications when you are mentioned in comments.
                  </div>
                </div>
                <Switch id="app-mentions" defaultChecked />
              </div>
            </div>
          </div>

          <Button>Save Preferences</Button>
        </CardContent>
      </Card>)
}