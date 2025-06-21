import { Department, Workspace } from "@/app/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import AddNewDepartment from "@/hooks/Functions/AddNewDepartment";
import { useAuth } from "@/app/providers/AuthProvider";
import { AddDepartmentDialog } from "./dialogs/add-department-dialog";
import { DepartmentMembersDialog } from "./dialogs/department-members-dialog";

// Helper function to format dates
function formatDate(dateString: string | Date | null | undefined) {
  if (!dateString) return "";
  return format(new Date(dateString), "MMM d, yyyy");
}

export default function Departments({
  workspaceData,
}: {
  workspaceData: Workspace;
}) {

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Workspace Departments</CardTitle>
            <CardDescription>
              Manage departments and team structure
            </CardDescription>
          </div>
          <AddDepartmentDialog workspaceid={workspaceData.id} trigger={<Button size="sm">Add Department</Button>} />
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workspaceData.departments.map((department) => {
              // Count members in this department
              const memberCount = workspaceData.members.filter(
                (member) => member.departmentId === department.id
              ).length;

              return (
                <Card key={department.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{department.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {memberCount} members
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Created{" "}
                        {formatDate(department.createdAt?.toString() || "")}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <DepartmentMembersDialog department={department} members={workspaceData.members.filter((member) => member.departmentId === department.id)} trigger={<Button variant="ghost" size="sm" className="w-full">View Members</Button>} />
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
