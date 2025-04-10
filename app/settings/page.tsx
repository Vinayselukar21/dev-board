import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Globe,
  Lock,
  Plus,
  Search,
  Shield
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
        {/* Main Content */}
        <main className="flex flex-1 flex-col">
          {/* Header */}
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
            <h1 className="text-lg font-semibold">Settings</h1>
            <div className="ml-auto flex items-center gap-2">
              <form className="hidden sm:flex">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search settings..."
                    className="w-60 rounded-lg bg-background pl-8"
                  />
                </div>
              </form>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="flex flex-col gap-6">
              {/* Settings Info */}
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Workspace Settings</h2>
                <p className="text-muted-foreground">Manage your workspace preferences and account settings.</p>
              </div>

              {/* Settings Tabs */}
              <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="pt-4">
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
                            <Input id="workspace-name" defaultValue="Marketing Team Workspace" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="workspace-description">Description</Label>
                            <Textarea
                              id="workspace-description"
                              defaultValue="Collaborative workspace for all marketing projects and campaigns."
                              className="min-h-[100px]"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="workspace-url">Workspace URL</Label>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">https://workspace.com/</span>
                              <Input id="workspace-url" defaultValue="marketing-team" className="flex-1" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Preferences</h3>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
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
                          </div>
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
                </TabsContent>

                {/* Profile Settings */}
                <TabsContent value="profile" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription>Manage your personal information and preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col gap-6 sm:flex-row">
                        <div className="flex flex-col items-center gap-4">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                            <AvatarFallback>AK</AvatarFallback>
                          </Avatar>
                          <Button variant="outline" size="sm">
                            Change Avatar
                          </Button>
                        </div>
                        <div className="grid flex-1 gap-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                              <Label htmlFor="first-name">First Name</Label>
                              <Input id="first-name" defaultValue="Alex" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="last-name">Last Name</Label>
                              <Input id="last-name" defaultValue="Kim" />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="alex@example.com" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="job-title">Job Title</Label>
                            <Input id="job-title" defaultValue="Project Manager" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Contact Information</h3>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" defaultValue="New York, NY" />
                          </div>
                        </div>
                      </div>

                      <Button>Update Profile</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications" className="pt-4">
                  <Card>
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
                  </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="pt-4">
                  <Card>
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
                  </Card>
                </TabsContent>

                {/* Billing Settings */}
                <TabsContent value="billing" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Settings</CardTitle>
                      <CardDescription>Manage your subscription and payment information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Current Plan</h3>
                        <div className="rounded-lg border p-4">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">Business Plan</h4>
                                <Badge>Current</Badge>
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                $49.99/month · Renews on May 15, 2023
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row">
                              <Button variant="outline">Change Plan</Button>
                              <Button variant="outline" className="text-red-500 hover:text-red-500">
                                Cancel Subscription
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span className="text-sm">Unlimited projects</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span className="text-sm">Up to 20 team members</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span className="text-sm">Advanced analytics</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span className="text-sm">Priority support</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Payment Method</h3>
                        <div className="rounded-lg border p-4">
                          <RadioGroup defaultValue="card-1">
                            <div className="flex items-center justify-between space-x-2">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card-1" id="card-1" />
                                <Label htmlFor="card-1" className="flex items-center gap-2">
                                  <div className="h-8 w-12 rounded border bg-muted" />
                                  <span>•••• •••• •••• 4242</span>
                                </Label>
                              </div>
                              <div className="text-sm text-muted-foreground">Expires 04/2024</div>
                            </div>
                          </RadioGroup>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                        <Button variant="outline" className="w-fit">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Payment Method
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Billing History</h3>
                        <div className="overflow-hidden rounded-lg border">
                          <table className="w-full">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                <th className="px-4 py-3 text-left text-sm font-medium"></th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              <tr>
                                <td className="px-4 py-3 text-sm">Apr 15, 2023</td>
                                <td className="px-4 py-3 text-sm">Business Plan - Monthly</td>
                                <td className="px-4 py-3 text-sm">$49.99</td>
                                <td className="px-4 py-3 text-sm">
                                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                    Paid
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  <Button variant="ghost" size="sm">
                                    Download
                                  </Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-sm">Mar 15, 2023</td>
                                <td className="px-4 py-3 text-sm">Business Plan - Monthly</td>
                                <td className="px-4 py-3 text-sm">$49.99</td>
                                <td className="px-4 py-3 text-sm">
                                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                    Paid
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  <Button variant="ghost" size="sm">
                                    Download
                                  </Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-sm">Feb 15, 2023</td>
                                <td className="px-4 py-3 text-sm">Business Plan - Monthly</td>
                                <td className="px-4 py-3 text-sm">$49.99</td>
                                <td className="px-4 py-3 text-sm">
                                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                    Paid
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  <Button variant="ghost" size="sm">
                                    Download
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
  )
}
