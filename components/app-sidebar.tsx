"use client";

import {
  CalendarDays,
  FolderKanban,
  LayoutDashboard,
  Plus,
  Settings,
  Users
} from "lucide-react";
import * as React from "react";

import { useAuth } from "@/app/providers/AuthProvider";
import { NavMenu } from "@/components/nav-menu";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";
import useGetWorkspaces from "@/hooks/useGetWorkspaces";
import sidebarStore from "@/store/sidebarStore";
import workspaceStore from "@/store/workspaceStore";
import { useStore } from "zustand";
import { CreateWorkspaceDialog } from "./create-workspace-dialog";
import { Button } from "./ui/button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import useGetMyOrgData from "@/hooks/useGetMyOrgData";
import organizationStore from "@/store/organizationStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace); // subscribes to changes
  const setActiveWorkspace = useStore(workspaceStore, (state) => state.setActiveWorkspace);
  const { session } = useAuth();
  const { workspaceData, workspacesLoading, errorLoadingWorkspaces, workspaceDataLoadedSuccess } =
    useGetWorkspaces();
  const {myOrgData, myOrgLoading, errorLoadingMyOrg} = useGetMyOrgData();

    const sidebar = useStore(sidebarStore, (state) => state.sidebar);
    const setSidebar = useStore(sidebarStore, (state) => state.setSidebar);

  // This is sample data.
  const  sidebarData = {
    user: {
      name: session?.name,
      email: session?.email,
      avatar: session?.avatar,
    },
    // navMain: [
    //   {
    //     title: "Playground",
    //     url: "#",
    //     icon: SquareTerminal,
    //     isActive: true,
    //     items: [
    //       {
    //         title: "History",
    //         url: "#",
    //       },
    //       {
    //         title: "Starred",
    //         url: "#",
    //       },
    //       {
    //         title: "Settings",
    //         url: "#",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Models",
    //     url: "#",
    //     icon: Bot,
    //     items: [
    //       {
    //         title: "Genesis",
    //         url: "#",
    //       },
    //       {
    //         title: "Explorer",
    //         url: "#",
    //       },
    //       {
    //         title: "Quantum",
    //         url: "#",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Documentation",
    //     url: "#",
    //     icon: BookOpen,
    //     items: [
    //       {
    //         title: "Introduction",
    //         url: "#",
    //       },
    //       {
    //         title: "Get Started",
    //         url: "#",
    //       },
    //       {
    //         title: "Tutorials",
    //         url: "#",
    //       },
    //       {
    //         title: "Changelog",
    //         url: "#",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Settings",
    //     url: "#",
    //     icon: Settings2,
    //     items: [
    //       {
    //         title: "General",
    //         url: "#",
    //       },
    //       {
    //         title: "Team",
    //         url: "#",
    //       },
    //       {
    //         title: "Billing",
    //         url: "#",
    //       },
    //       {
    //         title: "Limits",
    //         url: "#",
    //       },
    //     ],
    //   },
    // ],
    menu: [
      {
        name: "Dashboard",
        url: "#",
        icon: LayoutDashboard,
        routeName: "dashboard",
      },
      {
        name: "Projects",
        url: "#",
        icon: FolderKanban,
        routeName: "projects",
      },
      {
        name: "Calendar",
        url: "#",
        icon: CalendarDays,
        routeName: "calendar",
      },
      {
        name: "Team",
        url: "#",
        icon: Users,
        routeName: "team",
      },
      // {
      //   name: "Settings",
      //   url: "#",
      //   icon: Settings,
      //   routeName: "settings",
      // },
    ],
  };
  
  React.useEffect(() => {
    if (workspaceData.length > 0) {
      setActiveWorkspace(workspaceData[0]);
      // setWorkspace(workspaceData[0]);
      setSidebar({
        ...sidebar,
        workspaces: workspaceData,
      });
    }
  }, [workspaceDataLoadedSuccess]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {workspacesLoading ? (
          "Loading.."
        ) : errorLoadingWorkspaces ? (
          "Error loading workspaces"
        ) : (
          <WorkspaceSwitcher
            workspace={workspaceData}
            activeWorkspace={activeWorkspace}
            setActiveWorkspace={setActiveWorkspace}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={sidebarData.navMain || []} /> */}
        <NavMenu menu={sidebarData.menu || []} />
      </SidebarContent>
      <SidebarFooter>
      
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
