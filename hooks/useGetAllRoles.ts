import { OrganizationRole, OrgPermission, WorkspacePermission, WorkspaceRole } from "@/app/types";
import organizationStore from "@/store/organizationStore";
import rolesStore from "@/store/rolesStore";
import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";



interface QueryResponse {
  message: string;
  workspaceRoles: WorkspaceRole[];
  organizationRoles: OrganizationRole[];
  workspacePermissions: WorkspacePermission[];
  organizationPermissions: OrgPermission[];
}

const useGetRoles = () => {
  const {activeOrganization} = organizationStore.getState();
  const {activeWorkspace} = workspaceStore.getState();
    const {setWorkspaceRolesData, setOrganizationRolesData, setWorkspacePermissions, setOrganizationPermissions} = rolesStore.getState();
  const {
    data,
    isLoading: rolesLoading,
    error: errorLoadingRoles,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["roles", activeOrganization.id, activeWorkspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/organization/${activeOrganization.id}/${activeWorkspace.id}/roles/getall`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!activeOrganization.id && !!activeWorkspace.id,
  });

  const workspaceRolesData: WorkspaceRole[] = data?.workspaceRoles || [];
  const organizationRolesData: OrganizationRole[] = data?.organizationRoles || [];
  const workspacePermissions: WorkspacePermission[] = data?.workspacePermissions || [];
  const organizationPermissions: OrgPermission[] = data?.organizationPermissions || [];

  setWorkspaceRolesData(workspaceRolesData);
  setOrganizationRolesData(organizationRolesData);
  setWorkspacePermissions(workspacePermissions);
  setOrganizationPermissions(organizationPermissions);

  return { workspaceRolesData, organizationRolesData, rolesLoading, errorLoadingRoles };
};
export default useGetRoles;
