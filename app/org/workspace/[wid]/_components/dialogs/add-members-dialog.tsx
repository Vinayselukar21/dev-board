"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { useStore } from "zustand";
import workspaceStore from "@/store/workspaceStore";
import organizationStore from "@/store/organizationStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddUserToWorkspace from "@/hooks/Functions/AddUserToWorkspace";
import { toast } from "sonner";
import rolesStore from "@/store/rolesStore";

interface Department {
  id: string;
  name: string;
  [key: string]: any;
}

interface InviteMembersDialogProps {
  trigger: React.ReactNode;
  departments: Department[];
}

export function AddMembersDialog({
  trigger,
  departments,
}: InviteMembersDialogProps) {
  const queryClient = useQueryClient();
  const [members, setMembers] = useState<
    { userId: string; roleId: string; departmentId: string }[]
  >([{ userId: "", roleId: "", departmentId: "" }]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const workspaceRolesData = useStore(rolesStore, (state) => state.workspaceRolesData);
  const activeWorkspace = useStore(
    workspaceStore,
    (state) => state.activeWorkspace
  );
  const activeOrganization = useStore(
    organizationStore,
    (state) => state.activeOrganization
  );

  const workspaceMembers =
    activeWorkspace?.members &&
    activeWorkspace?.members?.map((member) => member?.user.id);

  // const handleAddMember = () => {
  //   setMembers([
  //     ...members,
  //     { userId: "", role: "", department: "" },
  //   ]);
  // };

  const handleRemoveMember = (index: number) => {
    if (members.length > 1) {
      const newMembers = [...members];
      newMembers.splice(index, 1);
      setMembers(newMembers);
    }
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMembers(newMembers);
  };

  const addNewWorkspaceMember = useMutation({
    mutationFn: AddUserToWorkspace,
    onSuccess: () => {
      toast.success("New member has been added to workspace");
      queryClient.invalidateQueries({ queryKey: ["members", activeWorkspace?.id] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to add member to workspace");
    },
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send invites
    addNewWorkspaceMember.mutate({
      userIds: members.map((member) => member.userId),
      roleId: members[0].roleId,
      departmentId: members[0].departmentId,
    });
    // Reset form
    setMembers([{ userId: "", roleId: "", departmentId: "" }]);
    setIsSubmitting(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button size="sm">Invite Members</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
            <DialogDescription>
              Invite new members to join your workspace. They'll receive an
              email invitation.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto py-4">
            {members.map((member, index) => (
              <div key={index} className="mb-4 grid grid-cols-12 gap-3">
                <div className="col-span-12 sm:col-span-5">
                  <Label
                    htmlFor={`email-${index}`}
                    className="mb-1 block text-xs"
                  >
                    User
                  </Label>
                  <Select
                    value={member.userId}
                    onValueChange={(value) =>
                      handleMemberChange(index, "userId", value)
                    }
                  >
                    <SelectTrigger id={`userId-${index}`} className="w-full">
                      <SelectValue placeholder="Select User" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeOrganization?.users
                        ?.filter(
                          (user) => !workspaceMembers?.includes(user?.id)
                        )
                        ?.map((user) => (
                          <SelectItem value={user?.id} key={user?.id}>{user?.name}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Label
                    htmlFor={`role-${index}`}
                    className="mb-1 block text-xs"
                  >
                    Role
                  </Label>
                  <Select
                    value={member.roleId}
                    onValueChange={(value) =>
                      handleMemberChange(index, "roleId", value)
                    }
                  >
                    <SelectTrigger id={`role-${index}`}  className="w-full">
                      <SelectValue placeholder="Select role"/>
                    </SelectTrigger>
                    <SelectContent>
                    {workspaceRolesData.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Label
                    htmlFor={`department-${index}`}
                    className="mb-1 block text-xs"
                  >
                    Department
                  </Label>
                  <Select
                    value={member.departmentId}
                    onValueChange={(value) =>
                      handleMemberChange(index, "departmentId", value)
                    }
                  >
                    <SelectTrigger id={`departmentId-${index}`} className="w-full">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1 flex items-end justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveMember(index)}
                    disabled={members.length === 1}
                    className="h-10 w-10"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            ))}
            {/* <Button type="button" variant="outline" size="sm" className="mt-2" onClick={handleAddMember}>
              <Plus className="mr-2 h-4 w-4" />
              Add Another
            </Button> */}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {}}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending Invites..." : "Send Invites"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
