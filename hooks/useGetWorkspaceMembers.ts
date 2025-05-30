// /workspace/cm95g50ef0001cd28xp5u4u3l/members

import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { WorkspaceMember } from "../app/types";
  
interface QueryResponse {
  message: string;
  members: WorkspaceMember[];
}

const useGetWorkspaceMembers = () => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const {
    data,
    isLoading: membersLoading,
    error: errorLoadingMembers,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["members", activeWorkspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/${activeWorkspace.id || ""}/members`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!activeWorkspace.id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const memberData: Array<WorkspaceMember> = Array.isArray(data?.members)
    ? data?.members.map(
        ({
          id,
          role,
          roleId,
          accepted,
          department,
          invitedAt,
          userId,
          workspaceId,
          user,
          projects,
          departmentId,
          workspace,
          calendarEvents,
          createdEvents,
          relationships,
        }) => ({
          id,
          role,
          roleId,
          accepted,
          department,
          invitedAt,
          userId,
          workspaceId,
          user,
          projects,
          departmentId,
          workspace,
          calendarEvents,
          createdEvents,
          relationships,
        })
      )
    : [];

  return { memberData, membersLoading, errorLoadingMembers };
};
export default useGetWorkspaceMembers;
