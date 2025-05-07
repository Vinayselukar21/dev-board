"use client";

import { ChevronsUpDown } from "lucide-react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { Workspace } from "@/app/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import sidebarStore from "@/store/sidebarStore";

export const icons = [
  { label: "AudioWaveform", icon: AudioWaveform },
  { label: "BookOpen", icon: BookOpen },
  { label: "Bot", icon: Bot },
  { label: "Command", icon: Command },
  { label: "Frame", icon: Frame },
  { label: "GalleryVerticalEnd", icon: GalleryVerticalEnd },
  { label: "Map", icon: Map },
  { label: "Pie Chart", icon: PieChart },
  { label: "Settings 2", icon: Settings2 },
  { label: "Square Terminal", icon: SquareTerminal },
];

export function WorkspaceSwitcher({
  workspace,
  activeWorkspace,
  setActiveWorkspace,
}: {
  workspace: Workspace[];
  activeWorkspace: Workspace | null;
  setActiveWorkspace: (workspace: Workspace) => void;
}) {
  const { isMobile } = useSidebar();
  const { sidebar } = sidebarStore.getState();
  
  if (!activeWorkspace) {
    return null;
  }
  const WorkspaceIcon = icons.find((icon) => icon.label === activeWorkspace.icon)?.icon
  
  console.log(activeWorkspace.icon , WorkspaceIcon)
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {WorkspaceIcon ?  <WorkspaceIcon className="size-4" /> : ""}
              </div>  
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeWorkspace.name}
                </span>
                {/* <span className="truncate text-xs">{activeWorkspace.plan}</span> */}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Workspaces
            </DropdownMenuLabel>
            {sidebar.workspaces.map((workspace, index) => {
              const Icon = icons.find((icon) => icon.label === workspace.icon)?.icon
              return (
                <DropdownMenuItem
                  onClick={() => {
                    setActiveWorkspace(workspace);
                    // router.push(`/workspace/${workspace.id}`);
                  }}
                  key={workspace.id}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                  {Icon && <Icon className="size-3.5 shrink-0" />}
                  </div>
                  {workspace.name}
                  {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              )
            })}
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Add workspace
              </div>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
