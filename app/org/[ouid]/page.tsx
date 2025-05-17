"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Phone, User, Building, Briefcase, Clock } from "lucide-react";
import organizationStore from "@/store/organizationStore";
import { useStore } from "zustand";
import { useParams } from "next/navigation";

// // Sample user data
// const users = [
//   {
//     id: "99a62e34-8e7c-4954-a8ae-c4f9901c5158",
//     email: "christopher@wakare.com",
//     name: "Christopher Wakare",
//     password: "$2b$10$A3ZueSHA0KjqAwvLOWU0juKtbNR4/sp2HKkIbX2i6JDYG0SkDBUmq",
//     role: "admin",
//     createdAt: "2025-05-09T10:00:33.652Z",
//     updatedAt: "2025-05-09T10:00:34.114Z",
//     contactNo: "1234567890",
//     location: "Thane, Mumbai",
//     isVerified: false,
//     lastLogin: null,
//     organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//     memberships: [
//       {
//         id: "cmagmn9kw0003cdscgmqddyvw",
//         role: "admin",
//         invitedAt: "2025-05-09T10:02:09.270Z",
//         accepted: false,
//         jobTitle: "",
//         userId: "99a62e34-8e7c-4954-a8ae-c4f9901c5158",
//         workspaceId: "cmagmn9kw0001cdscku581wdv",
//         departmentId: null,
//         organizationId: null,
//         workspace: {
//           id: "cmagmn9kw0001cdscku581wdv",
//           icon: "AudioWaveform",
//           name: "Next Js Team Workspace",
//           description: "The workspace consists of Next js team and projects",
//           createdAt: "2025-05-09T10:02:09.270Z",
//           updatedAt: "2025-05-09T10:02:09.270Z",
//           ownerId: "99a62e34-8e7c-4954-a8ae-c4f9901c5158",
//           organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//         },
//       },
//     ],
//   },
//   {
//     id: "2523aae5-a203-412c-a067-9df89b4cf314",
//     email: "vinay@selukar.com",
//     name: "Vinay Selukar",
//     password: "$2b$10$VosJvnWalpExowInrAq5y.hgk6yklUMHHPCp2tfzFr6wZdzaZz6Vy",
//     role: "user",
//     createdAt: "2025-05-09T10:03:48.532Z",
//     updatedAt: "2025-05-09T10:03:48.532Z",
//     contactNo: "7709428041",
//     location: "Nagpur",
//     isVerified: false,
//     lastLogin: null,
//     organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//     memberships: [
//       {
//         id: "cmagmpe440003cdd8wqn23szp",
//         role: "member",
//         invitedAt: "2025-05-09T10:03:48.532Z",
//         accepted: false,
//         jobTitle: "Fullstack Developer",
//         userId: "2523aae5-a203-412c-a067-9df89b4cf314",
//         workspaceId: "cmagmn9kw0001cdscku581wdv",
//         departmentId: "cmagmnkfk000bcdscra3wpxsf",
//         organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//         workspace: {
//           id: "cmagmn9kw0001cdscku581wdv",
//           icon: "AudioWaveform",
//           name: "Next Js Team Workspace",
//           description: "The workspace consists of Next js team and projects",
//           createdAt: "2025-05-09T10:02:09.270Z",
//           updatedAt: "2025-05-09T10:02:09.270Z",
//           ownerId: "99a62e34-8e7c-4954-a8ae-c4f9901c5158",
//           organizationId: "f3f3d124-57a8-4457-b874-6de2b5f40936",
//         },
//       },
//     ],
//   },
// ]

export default function UserProfile() {
  const params = useParams();
  const activeOrganization = useStore(
    organizationStore,
    (state) => state.activeOrganization
  );

  const users = activeOrganization?.users || [];
  // @ts-ignore
  const ouid: string = params?.ouid;
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(
    ouid
  );

  const selectedUser = users.find((user) => user.id === selectedUserId);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!selectedUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Profile</h1>
          <p className="text-muted-foreground">
            View and manage user information
          </p>
        </div>

        <div className="mb-6">
          <Select value={selectedUserId} onValueChange={setSelectedUserId}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedUser.name}`}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback>
                    {selectedUser.name &&
                      selectedUser?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">
                    {selectedUser.name}
                  </CardTitle>
                  <CardDescription>{selectedUser.email}</CardDescription>
                  <div className="mt-1">
                    <Badge
                      variant={
                        selectedUser.role === "admin" ? "default" : "secondary"
                      }
                    >
                      {selectedUser.role.charAt(0).toUpperCase() +
                        selectedUser.role.slice(1)}
                    </Badge>
                    <Badge
                      variant={selectedUser.isVerified ? "default" : "outline"}
                      className="ml-2"
                    >
                      {selectedUser.isVerified ? "Verified" : "Not Verified"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="account">Account Details</TabsTrigger>
              <TabsTrigger value="workspace">Workspace</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Full Name</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedUser.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Contact Number</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedUser.contactNo}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedUser.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">User ID</p>
                      <p className="text-xs text-muted-foreground break-all">
                        {selectedUser.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Organization ID</p>
                      {/* <p className="text-xs text-muted-foreground break-all">{selectedUser.organizationId}</p> */}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Created At</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(selectedUser.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Updated At</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(selectedUser.updatedAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Login</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedUser.lastLogin
                          ? formatDate(selectedUser.lastLogin)
                          : "Never"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workspace" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Workspace Memberships</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedUser.memberships &&
                    selectedUser.memberships.map((membership) => (
                      <div
                        key={membership.id}
                        className="border rounded-lg p-4 mb-4"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-muted-foreground" />
                            <h3 className="font-medium">
                              {membership.workspace.name}
                            </h3>
                          </div>
                          <Badge
                            variant={
                              membership.role === "admin"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {membership.role.charAt(0).toUpperCase() +
                              membership.role.slice(1)}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {membership.workspace.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          {membership.jobTitle && (
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Job Title</p>
                                <p className="text-muted-foreground">
                                  {membership.jobTitle || "Not specified"}
                                </p>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Invited At</p>
                              <p className="text-muted-foreground">
                                {formatDate(membership.invitedAt)}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Status</p>
                            <p className="text-muted-foreground">
                              {membership.accepted ? "Accepted" : "Pending"}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Workspace ID</p>
                            <p className="text-xs text-muted-foreground break-all">
                              {membership.workspaceId}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
