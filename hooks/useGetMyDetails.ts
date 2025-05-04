// /:workspaceId/member/:memberId

import { useAuth } from "@/app/providers/AuthProvider";
import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface QueryResponse {
  message: string;
  workspaceMember: any;
}

const useGetMyDetails = () => {
  const { session } = useAuth();
  const { activeWorkspace: workspace } = workspaceStore.getState();
  const workspaceMemberId = session.memberships.find(
    (m: any) => m.workspaceId === workspace.id
  )?.id;
  const {
    data,
    isLoading: myDataLoading,
    error: errorLoadingMyData,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["mydetails", workspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/${workspace.id}/member/${workspaceMemberId}`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!workspace.id,
  });

  const myData = data?.workspaceMember;

  return { myData, myDataLoading, errorLoadingMyData };
};
export default useGetMyDetails;