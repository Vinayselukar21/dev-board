import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../app/providers/AuthProvider";
import { Workspace } from "../app/types";

interface QueryResponse {
  message: string;
  data: Workspace[];
}

const useGetWorkspaces = () => {
  const { session } = useAuth();
  const {
    data,
    isLoading: workspacesLoading,
    error: errorLoadingWorkspaces,
    isSuccess: workspaceDataLoadedSuccess
  } = useQuery<QueryResponse, Error>({
    queryKey: ["workspaces", session?.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/getall/${session?.id || ""}`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!session?.id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const workspaceData: Array<Workspace> = Array.isArray(data?.data)
    ? data?.data.map(
        ({
          icon,
          name,
          description,
          id,
          createdAt,
          updatedAt,
          ownerId,
          departments,
          members,
          projects,
        }) => ({
          icon,
          name,
          description,
          id,
          createdAt,
          updatedAt,
          ownerId,
          departments,
          members,
          projects,
        })
      )
    : [];

  return { workspaceData, workspacesLoading, errorLoadingWorkspaces, workspaceDataLoadedSuccess };
};
export default useGetWorkspaces;
