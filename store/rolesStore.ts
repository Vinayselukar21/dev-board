import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { WorkspaceRole, OrganizationRole, WorkspacePermission, OrgPermission } from "../app/types";

type RolesStoreState = {
  workspaceRolesData: WorkspaceRole[];
  organizationRolesData: OrganizationRole[];
  workspacePermissions: WorkspacePermission[];
  organizationPermissions: OrgPermission[];
};

type RolesStoreActions = {
  setWorkspaceRolesData: (
    workspaceRolesData: RolesStoreState["workspaceRolesData"]
  ) => void;
  setOrganizationRolesData: (
    organizationRolesData: RolesStoreState["organizationRolesData"]
  ) => void;
  setWorkspacePermissions: (
    workspacePermissions: RolesStoreState["workspacePermissions"]
  ) => void;
  setOrganizationPermissions: (
    organizationPermissions: RolesStoreState["organizationPermissions"]
  ) => void;
  resetRolesData: () => void;
};

type RolesStore = RolesStoreState & RolesStoreActions;

const rolesStore = createStore<RolesStore>()(
  persist(
    (set) => ({
      workspaceRolesData: [],
      organizationRolesData: [],
      workspacePermissions: [],
      organizationPermissions: [],
      setWorkspaceRolesData: (workspaceRolesData: RolesStoreState["workspaceRolesData"]) =>
        set({ workspaceRolesData }),
      setOrganizationRolesData: (organizationRolesData: RolesStoreState["organizationRolesData"]) =>
        set({ organizationRolesData }),
      setWorkspacePermissions: (workspacePermissions: RolesStoreState["workspacePermissions"]) =>
        set({ workspacePermissions }),
      setOrganizationPermissions: (organizationPermissions: RolesStoreState["organizationPermissions"]) =>
        set({ organizationPermissions }),
      resetRolesData: () => {
        set({ workspaceRolesData: [], organizationRolesData: [], workspacePermissions: [], organizationPermissions: [] });
      },
    }),
    { name: "roles-storage" }
  )
);

export default rolesStore;
