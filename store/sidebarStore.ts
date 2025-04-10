import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { Project, Workspace } from "../app/types";

type SidebarStoreState = {
  sidebar: { workspaces: Workspace[]; projects: Project[] };
};

type SidebarStoreActions = {
  setSidebar: (sidebar: SidebarStoreState["sidebar"]) => void;
};

type SidebarStore = SidebarStoreState & SidebarStoreActions;

const sidebarStore = createStore<SidebarStore>()(
  persist(
    (set) => ({
      sidebar: { workspaces: [], projects: [] },
      setSidebar: (sidebar) => set({ sidebar }),
    }),
    { name: "sidebar-storage" }
  )
);

export default sidebarStore;
