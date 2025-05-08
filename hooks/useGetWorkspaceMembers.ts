// /workspace/cm95g50ef0001cd28xp5u4u3l/members

import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { WorkspaceMember } from "../app/types";
import { useStore } from "zustand";
  
interface QueryResponse {
  message: string;
  members: WorkspaceMember[];
}

const useGetWorkspaceMembers = () => {
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace); // subscribes to changes
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
  });
  const memberData: Array<WorkspaceMember> = Array.isArray(data?.members)
    ? data?.members.map(
        ({
          id,
          accepted,
          department,
          invitedAt,
          userId,
          workspaceId,
          user,
          projects,
          jobTitle,
        }) => ({
          id,
          role: user.role,
          accepted,
          department,
          invitedAt,
          userId,
          workspaceId,
          user,
          projects,
          jobTitle,
        })
      )
    : [];

  return { memberData, membersLoading, errorLoadingMembers };
};
export default useGetWorkspaceMembers;
