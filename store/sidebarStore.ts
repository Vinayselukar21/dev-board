import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { Project, Workspace } from "../app/types";

type SidebarStoreState = {
  sidebar: { workspaces: Workspace[]; projects: Project[] };
};

type SidebarStoreActions = {
  setSidebar: (sidebar: SidebarStoreState["sidebar"]) => void;
  resetSidebar: () => void;
};

type SidebarStore = SidebarStoreState & SidebarStoreActions;

const sidebarStore = createStore<SidebarStore>()(
  persist(
    (set) => ({
      sidebar: { workspaces: [], projects: [] },
      setSidebar: (sidebar) => set({ sidebar }),
      resetSidebar: () => {
        set({ sidebar: { workspaces: [], projects: [] } });
      },
    }),
    { name: "sidebar-storage" }
  )
);

export default sidebarStore;
