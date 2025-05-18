import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { WorkspaceRole, OrganizationRole } from "../app/types";

type RolesStoreState = {
  workspaceRolesData: WorkspaceRole[];
  organizationRolesData: OrganizationRole[];
};

type RolesStoreActions = {
  setWorkspaceRolesData: (
    workspaceRolesData: RolesStoreState["workspaceRolesData"]
  ) => void;
  setOrganizationRolesData: (
    organizationRolesData: RolesStoreState["organizationRolesData"]
  ) => void;
  resetRolesData: () => void;
};

type RolesStore = RolesStoreState & RolesStoreActions;

const rolesStore = createStore<RolesStore>()(
  persist(
    (set) => ({
      workspaceRolesData: [],
      organizationRolesData: [],
      setWorkspaceRolesData: (workspaceRolesData: RolesStoreState["workspaceRolesData"]) =>
        set({ workspaceRolesData }),
      setOrganizationRolesData: (organizationRolesData: RolesStoreState["organizationRolesData"]) =>
        set({ organizationRolesData }),
      resetRolesData: () => {
        set({ workspaceRolesData: [], organizationRolesData: [] });
      },
    }),
    { name: "roles-storage" }
  )
);

export default rolesStore;
