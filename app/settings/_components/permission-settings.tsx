import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetMyDetails from "@/hooks/useGetMyDetails";
import { TabsContent } from "@/components/ui/tabs";
import {  Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function PermissionSettings() {
    return (
         <Card>
           <CardHeader>
             <CardTitle>Permissions & Roles</CardTitle>
             <CardDescription>Manage workspace roles and permissions for team members.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
             {/* Role Management */}
             <div className="space-y-4">
               <h3 className="text-lg font-medium">Role Management</h3>
               <div className="overflow-hidden rounded-lg border">
                 <table className="w-full">
                   <thead className="bg-muted/50">
                     <tr>
                       <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                       <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                       <th className="px-4 py-3 text-left text-sm font-medium">Members</th>
                       <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y">
                     <tr>
                       <td className="px-4 py-3 font-medium">Admin</td>
                       <td className="px-4 py-3 text-sm">
                         Full access to all workspace settings and features
                       </td>
                       <td className="px-4 py-3 text-sm">2</td>
                       <td className="px-4 py-3 text-sm">
                         <Button variant="ghost" size="sm">
                           Edit
                         </Button>
                       </td>
                     </tr>
                     <tr>
                       <td className="px-4 py-3 font-medium">Member</td>
                       <td className="px-4 py-3 text-sm">
                         Can create and edit content, but cannot modify workspace settings
                       </td>
                       <td className="px-4 py-3 text-sm">5</td>
                       <td className="px-4 py-3 text-sm">
                         <Button variant="ghost" size="sm">
                           Edit
                         </Button>
                       </td>
                     </tr>
                     <tr>
                       <td className="px-4 py-3 font-medium">Viewer</td>
                       <td className="px-4 py-3 text-sm">Read-only access to content</td>
                       <td className="px-4 py-3 text-sm">1</td>
                       <td className="px-4 py-3 text-sm">
                         <Button variant="ghost" size="sm">
                           Edit
                         </Button>
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </div>
               <Button variant="outline" size="sm" className="mt-2">
                 <Plus className="mr-2 h-4 w-4" />
                 Create Custom Role
               </Button>
             </div>

             {/* Permission Settings */}
             <div className="space-y-4">
               <h3 className="text-lg font-medium">Permission Settings</h3>
               <div className="rounded-md border p-4">
                 <div className="mb-4 flex items-center justify-between">
                   <div>
                     <h4 className="font-medium">Role to Configure</h4>
                     <p className="text-sm text-muted-foreground">Select a role to configure permissions</p>
                   </div>
                   <Select defaultValue="member">
                     <SelectTrigger className="w-[180px]">
                       <SelectValue placeholder="Select role" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="admin">Admin</SelectItem>
                       <SelectItem value="member">Member</SelectItem>
                       <SelectItem value="viewer">Viewer</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>

                 <div className="space-y-4">
                   <div className="rounded-md border">
                     <div className="bg-muted/50 px-4 py-2 font-medium">Projects</div>
                     <div className="divide-y">
                       <div className="flex items-center justify-between px-4 py-3">
                         <div>
                           <div className="font-medium">Create Projects</div>
                           <div className="text-sm text-muted-foreground">
                             Can create new projects in the workspace
                           </div>
                         </div>
                         <Switch defaultChecked />
                       </div>
                       <div className="flex items-center justify-between px-4 py-3">
                         <div>
                           <div className="font-medium">Edit Projects</div>
                           <div className="text-sm text-muted-foreground">
                             Can edit project details and settings
                           </div>
                         </div>
                         <Switch defaultChecked />
                       </div>
                       <div className="flex items-center justify-between px-4 py-3">
                         <div>
                           <div className="font-medium">Delete Projects</div>
                           <div className="text-sm text-muted-foreground">
                             Can delete projects from the workspace
                           </div>
                         </div>
                         <Switch />
                       </div>
                     </div>
                   </div>

                   <div className="rounded-md border">
                     <div className="bg-muted/50 px-4 py-2 font-medium">Tasks</div>
                     <div className="divide-y">
                       <div className="flex items-center justify-between px-4 py-3">
                         <div>
                           <div className="font-medium">Create Tasks</div>
                           <div className="text-sm text-muted-foreground">
                             Can create new tasks in projects
                           </div>
                         </div>
                         <Switch defaultChecked />
                       </div>
                       <div className="flex items-center justify-between px-4 py-3">
                         <div>
                           <div className="font-medium">Edit Any Task</div>
                           <div className="text-sm text-muted-foreground">
                             Can edit any task, including those created by others
                           </div>
                         </div>
                         <Switch defaultChecked />
                       </div>
                       <div className="flex items-center justify-between px-4 py-3">
                         <div>
                           <div className="font-medium">Delete Tasks</div>
                           <div className="text-sm text-muted-foreground">Can delete tasks from projects</div>
                         </div>
                         <Switch defaultChecked />
                       </div>
                     </div>
                   </div>

                   <div className="rounded-md border">
                     <div className="bg-muted/50 px-4 py-2 font-medium">Team Management</div>
                     <div className="divide-y">
                       <div className="flex items-center justify-between px-4 py-3">
                         <div>
                           <div className="font-medium">Invite Members</div>
                           <div className="text-sm text-muted-foreground">
                             Can invite new members to the workspace
                           </div>
                         </div>
                         <Switch defaultChecked />
                       </div>
                       <div className="flex items-center justify-between px-4 py-3">
                         <div>
                           <div className="font-medium">Remove Members</div>
                           <div className="text-sm text-muted-foreground">
                             Can remove members from the workspace
                           </div>
                         </div>
                         <Switch />
                       </div>
                       <div className="flex items-center justify-between px-4 py-3">
                         <div>
                           <div className="font-medium">Change Member Roles</div>
                           <div className="text-sm text-muted-foreground">
                             Can change roles of other members
                           </div>
                         </div>
                         <Switch />
                       </div>
                     </div>
                   </div>

                   <div className="rounded-md border">
                     <div className="bg-muted/50 px-4 py-2 font-medium">Calendar & Events</div>
                     <div className="divide-y">
                       <div className="flex items-center justify-between px-4 py-3">
                         <div>
                           <div className="font-medium">Create Events</div>
                           <div className="text-sm text-muted-foreground">Can create calendar events</div>
                         </div>
                         <Switch defaultChecked />
                       </div>
                       <div className="flex items-center justify-between px-4 py-3">
                         <div>
                           <div className="font-medium">Edit Any Event</div>
                           <div className="text-sm text-muted-foreground">
                             Can edit events created by others
                           </div>
                         </div>
                         <Switch defaultChecked />
                       </div>
                       <div className="flex items-center justify-between px-4 py-3">
                         <div>
                           <div className="font-medium">Delete Events</div>
                           <div className="text-sm text-muted-foreground">Can delete calendar events</div>
                         </div>
                         <Switch defaultChecked />
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Member Role Assignment */}
             <div className="space-y-4">
               <h3 className="text-lg font-medium">Member Role Assignment</h3>
               <div className="overflow-hidden rounded-lg border">
                 <table className="w-full">
                   <thead className="bg-muted/50">
                     <tr>
                       <th className="px-4 py-3 text-left text-sm font-medium">Member</th>
                       <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                       <th className="px-4 py-3 text-left text-sm font-medium">Current Role</th>
                       <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y">
                     <tr>
                       <td className="px-4 py-3">
                         <div className="flex items-center gap-2">
                           <Avatar className="h-8 w-8">
                             <AvatarFallback>AK</AvatarFallback>
                           </Avatar>
                           <span>Alex Kim</span>
                         </div>
                       </td>
                       <td className="px-4 py-3 text-sm">alex@example.com</td>
                       <td className="px-4 py-3 text-sm">
                         <Badge>Admin</Badge>
                       </td>
                       <td className="px-4 py-3 text-sm">
                         <Select defaultValue="admin">
                           <SelectTrigger className="w-[120px]">
                             <SelectValue placeholder="Select role" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="admin">Admin</SelectItem>
                             <SelectItem value="member">Member</SelectItem>
                             <SelectItem value="viewer">Viewer</SelectItem>
                           </SelectContent>
                         </Select>
                       </td>
                     </tr>
                     <tr>
                       <td className="px-4 py-3">
                         <div className="flex items-center gap-2">
                           <Avatar className="h-8 w-8">
                             <AvatarFallback>SJ</AvatarFallback>
                           </Avatar>
                           <span>Sarah Johnson</span>
                         </div>
                       </td>
                       <td className="px-4 py-3 text-sm">sarah@example.com</td>
                       <td className="px-4 py-3 text-sm">
                         <Badge variant="outline">Member</Badge>
                       </td>
                       <td className="px-4 py-3 text-sm">
                         <Select defaultValue="member">
                           <SelectTrigger className="w-[120px]">
                             <SelectValue placeholder="Select role" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="admin">Admin</SelectItem>
                             <SelectItem value="member">Member</SelectItem>
                             <SelectItem value="viewer">Viewer</SelectItem>
                           </SelectContent>
                         </Select>
                       </td>
                     </tr>
                     <tr>
                       <td className="px-4 py-3">
                         <div className="flex items-center gap-2">
                           <Avatar className="h-8 w-8">
                             <AvatarFallback>MC</AvatarFallback>
                           </Avatar>
                           <span>Michael Chen</span>
                         </div>
                       </td>
                       <td className="px-4 py-3 text-sm">michael@example.com</td>
                       <td className="px-4 py-3 text-sm">
                         <Badge variant="outline">Member</Badge>
                       </td>
                       <td className="px-4 py-3 text-sm">
                         <Select defaultValue="member">
                           <SelectTrigger className="w-[120px]">
                             <SelectValue placeholder="Select role" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="admin">Admin</SelectItem>
                             <SelectItem value="member">Member</SelectItem>
                             <SelectItem value="viewer">Viewer</SelectItem>
                           </SelectContent>
                         </Select>
                       </td>
                     </tr>
                     <tr>
                       <td className="px-4 py-3">
                         <div className="flex items-center gap-2">
                           <Avatar className="h-8 w-8">
                             <AvatarFallback>JT</AvatarFallback>
                           </Avatar>
                           <span>Jessica Taylor</span>
                         </div>
                       </td>
                       <td className="px-4 py-3 text-sm">jessica@example.com</td>
                       <td className="px-4 py-3 text-sm">
                         <Badge variant="secondary">Viewer</Badge>
                       </td>
                       <td className="px-4 py-3 text-sm">
                         <Select defaultValue="viewer">
                           <SelectTrigger className="w-[120px]">
                             <SelectValue placeholder="Select role" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="admin">Admin</SelectItem>
                             <SelectItem value="member">Member</SelectItem>
                             <SelectItem value="viewer">Viewer</SelectItem>
                           </SelectContent>
                         </Select>
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </div>
             </div>

             <Button>Save Changes</Button>
           </CardContent>
         </Card>
    )
}