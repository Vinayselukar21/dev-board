'use client';
import { useAuth } from "@/app/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { icons } from "@/components/workspace-switcher";
import useGetWorkspaceById from "@/hooks/useGetWorkspaceById";
import organizationStore from "@/store/organizationStore";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useStore } from "zustand";
import Departments from "./_components/department";
import { EditWorkspaceDialog } from "./_components/dialogs/edit-workspace-dialog";
import Members from "./_components/members";
import Overview from "./_components/overview";
import Projects from "./_components/projects";
import PermissionSettings from "./_components/permission-settings";


export default function WorkspaceDashboard() {
  const queryClient = useQueryClient();
  const { session } = useAuth();
 const params = useParams();
  const activeOrganization = useStore(
    organizationStore,
    (state) => state.activeOrganization
  );
const {workspaceData, workspaceLoading, errorLoadingWorkspace, workspaceDataLoadedSuccess} = useGetWorkspaceById(params.wid as string);

  if (!workspaceData) {
    return <div>Workspace not found</div>;
  }
  const WorkspaceIcon = icons.find((icon) => icon.label === workspaceData.icon)?.icon


  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            {WorkspaceIcon ?  <WorkspaceIcon className="size-6" /> : ""}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{workspaceData.name}</h1>
            <p className="text-muted-foreground">{workspaceData.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <EditWorkspaceDialog workspace={{
            id: workspaceData.id,
            name: workspaceData.name,
            description: workspaceData.description || "",
          }} trigger={<Button size="sm">Edit Workspace</Button>} />
          
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Overview workspaceData={workspaceData} />
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members">
          <Members workspaceData={workspaceData} />
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <Projects workspaceData={workspaceData} />
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments">
          <Departments workspaceData={workspaceData} />
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions">
          <PermissionSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
