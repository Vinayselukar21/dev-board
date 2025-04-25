"use client";

import {
  BookOpen,
  Bot,
  CalendarDays,
  FolderKanban,
  Frame,
  LayoutDashboard,
  Map,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react";
import * as React from "react";

import { Workspace } from "@/app/types";
import useGetWorkspaces from "@/hooks/useGetWorkspaces";
import { useAuth } from "@/app/providers/AuthProvider";
import { NavMenu } from "@/components/nav-menu";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { WorkspaceSwitcher } from "./workspace-switcher";
import workspaceStore from "@/store/workspaceStore";
import sidebarStore from "@/store/sidebarStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const [activeWorkspace, setActiveWorkspace] = React.useState<Workspace>({
  //   id: "",
  //   name: "",
  //   description: "",
  //   createdAt: "",
  //   updatedAt: "",
  //   ownerId: "",
  // });
  const { activeWorkspace,  setActiveWorkspace } = workspaceStore.getState();
  const { session } = useAuth();
  const { workspaceData, workspacesLoading, errorLoadingWorkspaces, workspaceDataLoadedSuccess } =
    useGetWorkspaces();

  const { sidebar, setSidebar } = sidebarStore.getState();

  // This is sample data.
  const sidebarData = {
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
      {
        name: "Settings",
        url: "#",
        icon: Settings,
        routeName: "settings",
      },
    ],
    workspaces: workspaceData,
  };
// console.log({ workspaceData, workspacesLoading, errorLoadingWorkspaces, workspaceDataLoadedSuccess })
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
            workspace={sidebarData.workspaces}
            activeWorkspace={activeWorkspace}
            setActiveWorkspace={setActiveWorkspace}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={sidebarData.navMain} /> */}
        <NavMenu menu={sidebarData.menu || []} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
