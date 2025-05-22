import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Workspace } from "../app/types";

interface QueryResponse {
  message: string;
  workspace: Workspace;
}

const useGetWorkspaceById = (workspaceId: string) => {
  const {
    data,
    isLoading: workspaceLoading,
    error: errorLoadingWorkspace,
    isSuccess: workspaceDataLoadedSuccess
  } = useQuery<QueryResponse, Error>({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/getbyid/${workspaceId}`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!workspaceId,
  });

  const workspaceData: Workspace | null = data?.workspace || null;

  return { workspaceData, workspaceLoading, errorLoadingWorkspace, workspaceDataLoadedSuccess };
};

export default useGetWorkspaceById;