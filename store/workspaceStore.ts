import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { Workspace } from "../app/types";

type WorkspaceStoreState = {
  activeWorkspace: Workspace;
};

type WorkspaceStoreActions = {
  setActiveWorkspace: (
    activeWorkspace: WorkspaceStoreState["activeWorkspace"]
  ) => void;
  resetActiveWorkspace: () => void;
};

type WorkspaceStore = WorkspaceStoreState & WorkspaceStoreActions;

const workspaceStore = createStore<WorkspaceStore>()(
  persist(
    (set) => ({
      activeWorkspace: {
        id: "",
        icon: "",
        name: "",
        description: "",
        createdAt: "",
        updatedAt: "",
        ownerId: "",
        departments:[],
        members:[],
        projects:[],
      },
      setActiveWorkspace: (
        activeWorkspace: WorkspaceStoreState["activeWorkspace"]
      ) => set({ activeWorkspace }),
      resetActiveWorkspace: () => {
        set({ activeWorkspace: { id: "", icon: "", name: "", description: "", createdAt: "", updatedAt: "", ownerId: "", departments:[], members:[], projects:[] } });
      },
    }),
    { name: "workspace-storage" }
  )
);

export default workspaceStore;
