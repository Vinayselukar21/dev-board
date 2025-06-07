"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Project, WorkspaceMember } from "@/app/types";
import AddMemberToProject from "@/hooks/Functions/AddMemberToProject";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface ManageProjectTeamDialogProps {
  trigger: React.ReactNode;
  project: Project;
  allMembers: WorkspaceMember[];
}

export function ManageProjectTeamDialog({
  trigger,
  project,
  allMembers,
}: ManageProjectTeamDialogProps) {
  const queryClient = useQueryClient();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(selectedMembers, "selectedMembers");
  // Initialize selected members from project
  useEffect(() => {
    if (project) {
      const currentMemberIds = project?.members?.map((pm) => pm.member.id);
      setSelectedMembers(currentMemberIds || []);
    }
  }, [project]);

  // Helper function to get initials from name
  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  // Filter members based on search query
  const filteredMembers = allMembers.filter((member) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      member.user?.name?.toLowerCase().includes(lowerCaseQuery) ||
      member.user?.email?.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const addMemberToProject = useMutation({
    mutationFn: AddMemberToProject,
    onSuccess: (response) => {
      // Invalidate and refetch
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["workspace-by-id"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Toggle member selection
  const toggleMember = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
      addMemberToProject.mutate({
        projectId: project.id,
        memberId: memberId,
      });
    }
  };

  // Handle save changes
  const handleSaveChanges = () => {
    setIsSubmitting(true);
    // onUpdateTeam(selectedMembers)
    setIsSubmitting(false);
  };

  

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage Project Team</DialogTitle>
          <DialogDescription>
            Add or remove team members for {project.name}
          </DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-2">
            {filteredMembers.map((member) => {
              const isSelected = selectedMembers.includes(member.id);
              const isCurrentMember = project?.members?.some(
                (pm) => pm.member.id === member.id
              );

              return (
                <div
                  key={member.id}
                  className={`flex items-center justify-between rounded-md border p-3 ${
                    isSelected ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleMember(member.id)}
                      id={`member-${member.id}`}
                    />
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(member.user.name!)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <label
                        htmlFor={`member-${member.id}`}
                        className="cursor-pointer font-medium"
                      >
                        {member.user?.name}
                      </label>
                      <p className="text-sm text-muted-foreground">
                        No job title
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        member.role.name === "Owner" ? "default" : "outline"
                      }
                    >
                      {member.role.name}
                    </Badge>
                    {isCurrentMember && (
                      <Badge variant="secondary">Current</Badge>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredMembers.length === 0 && (
              <div className="flex h-20 items-center justify-center rounded-lg border border-dashed">
                <p className="text-center text-muted-foreground">
                  No members found matching your search.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="mt-4">
          <div className="mr-auto text-sm text-muted-foreground">
            {selectedMembers.length}{" "}
            {selectedMembers.length === 1 ? "member" : "members"} selected
          </div>
          <Button variant="outline" onClick={() => {}}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
