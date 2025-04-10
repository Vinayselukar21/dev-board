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
};

type WorkspaceStore = WorkspaceStoreState & WorkspaceStoreActions;

const workspaceStore = createStore<WorkspaceStore>()(
  persist(
    (set) => ({
      activeWorkspace: {
        id: "",
        name: "",
        description: "",
        createdAt: "",
        updatedAt: "",
        ownerId: "",
      },
      setActiveWorkspace: (
        activeWorkspace: WorkspaceStoreState["activeWorkspace"]
      ) => set({ activeWorkspace }),
    }),
    { name: "workspace-storage" }
  )
);

export default workspaceStore;
