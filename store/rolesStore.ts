import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { WorkspaceRole, OrganizationRole, WorkspacePermission, OrgPermission } from "../app/types";

type RolesStoreState = {
  workspaceRolesData: WorkspaceRole[];
  organizationRolesData: OrganizationRole[];
  workspacePermissions: WorkspacePermission[];
  orgPermissions: OrgPermission[];
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
  setOrgPermissions: (
    orgPermissions: RolesStoreState["orgPermissions"]
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
      orgPermissions: [],
      setWorkspaceRolesData: (workspaceRolesData: RolesStoreState["workspaceRolesData"]) =>
        set({ workspaceRolesData }),
      setOrganizationRolesData: (organizationRolesData: RolesStoreState["organizationRolesData"]) =>
        set({ organizationRolesData }),
      setWorkspacePermissions: (workspacePermissions: RolesStoreState["workspacePermissions"]) =>
        set({ workspacePermissions }),
      setOrgPermissions: (orgPermissions: RolesStoreState["orgPermissions"]) =>
        set({ orgPermissions }),
      resetRolesData: () => {
        set({ workspaceRolesData: [], organizationRolesData: [], workspacePermissions: [], orgPermissions: [] });
      },
    }),
    { name: "roles-storage" }
  )
);

export default rolesStore;
