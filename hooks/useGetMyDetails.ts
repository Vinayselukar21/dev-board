// /:workspaceId/member/:memberId

import { useAuth } from "@/app/providers/AuthProvider";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { activeWorkspaceDetails } from "@/utils/activeWorkspaceMemberId";
interface QueryResponse {
  message: string;
  user: any;
}

const useGetMyDetails = () => {
  const { session } = useAuth();
  const {WorkspaceMemberId} = activeWorkspaceDetails()
  const {
    data,
    isLoading: accountDetailsLoading,
    error: errorLoadingAccountDetails,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["account-details"],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/auth/me/${WorkspaceMemberId}/all`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!session.id && !!WorkspaceMemberId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const accountDetails = data?.user;

  return { accountDetails, accountDetailsLoading, errorLoadingAccountDetails };
};
export default useGetMyDetails;