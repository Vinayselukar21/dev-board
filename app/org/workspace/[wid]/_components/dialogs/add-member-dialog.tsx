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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "zustand";
import organizationStore from "@/store/organizationStore";
import workspaceStore from "@/store/workspaceStore";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import AddUserToWorkspace from "@/hooks/Functions/AddUserToWorkspace";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
interface InviteMemberDialogProps {
  trigger?: React.ReactNode;
}
export function InviteMemberDialog({ trigger }: InviteMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [role, setRole] = useState<"member" | "admin">("member");
  const [departmentId, setDepartmentId] = useState<string>("");
  const activeWorkspace = useStore(
    workspaceStore,
    (state) => state.activeWorkspace
  );
  const activeOrganization = useStore(
    organizationStore,
    (state) => state.activeOrganization
  );
  const queryClient = useQueryClient();

  const workspaceMembers = activeWorkspace?.members && activeWorkspace?.members?.map((member) => member?.user.id);

  const addNewWorkspaceMember = useMutation({
    mutationFn: AddUserToWorkspace,
    onSuccess: () => {
      toast.success("New member has been added to workspace");
      queryClient.invalidateQueries({ queryKey: ["members", activeWorkspace?.id] });
      setOpen(false);
      setRole("member");
      setDepartmentId("");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to add member to workspace");
    },
  });

  const handleAddMember = () => {
    addNewWorkspaceMember.mutate({
      userIds: selectedUsers,
      roleId: role,
      departmentId: departmentId,
    });
  };
  console.log(selectedUsers)
  return (
    <Dialog open={open} onOpenChange={(open) => {setOpen(open)
      setSelectedUsers([]);
      setRole("member");
      setDepartmentId("");
    }}>
      <DialogTrigger asChild>
        {trigger || <Button size="sm">Invite Member</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Add a new member to your workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            <div>
              <Label>Workspace Members</Label>
              <div className="flex flex-wrap gap-2 py-4">
                {activeWorkspace?.members?.map((member) => (
                  <Badge variant="outline" key={member?.user.id}>
                    {member?.user.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>All Organization Members</Label>
              <div className="rounded-md border p-4">
                <div className="space-y-3">
                  {activeOrganization?.users?.filter((user) => !workspaceMembers?.includes(user?.id))?.map((user) => (
                    <div className="flex items-start space-x-2" key={user?.id} >
                      <Checkbox id={user?.id} checked={selectedUsers.includes(user?.id)} onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedUsers([...selectedUsers, user?.id]);
                        } else {
                          setSelectedUsers(selectedUsers.filter((id) => id !== user?.id));
                        }
                      }} />
                      <div className="grid gap-1.5">
                        <Label htmlFor={user?.id} className="font-medium">
                          {user?.name}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
           <div>
              <Label className="mb-2">Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value as "member" | "admin")} required>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2">Department</Label>
              <Select value={departmentId} onValueChange={setDepartmentId} required>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {activeWorkspace?.departments?.map((department) => (
                    <SelectItem key={department?.id} value={department?.id}>
                      {department?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
           </div>

          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddMember} disabled={addNewWorkspaceMember.isPending || selectedUsers.length === 0 || !role || !departmentId}>
              {addNewWorkspaceMember.isPending ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
