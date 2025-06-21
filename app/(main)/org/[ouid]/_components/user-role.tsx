import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/app/types";
import rolesStore from "@/store/rolesStore";
import { useStore } from "zustand";

export default function UserRole({ selectedUser }: { selectedUser: User }) {
    const organizationRolesData = useStore(rolesStore, (state) => state.organizationRolesData)
    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>User Role Assignment</CardTitle>
                <CardDescription>
                    Assign a role to user.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium">
                                    User
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium">
                                    Current Role
                                </th>
                                {selectedUser.organizationRole?.name!="Owner" && <th className="px-4 py-3 text-left text-sm font-medium">
                                    Action
                                </th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>AK</AvatarFallback>
                                        </Avatar>
                                        <span>{selectedUser.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <Badge>{selectedUser.organizationRole?.name}</Badge>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {selectedUser.organizationRole?.name!="Owner" && <Select defaultValue={selectedUser.organizationRole?.name}>
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {organizationRolesData?.map((role) => (
                                                <SelectItem key={role.id} value={role.name}>
                                                    {role.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}