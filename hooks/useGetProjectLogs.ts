import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Log } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";

interface QueryResponse {
  message: string;
  logs: Log[];
}

const useGetProjectLogs = () => {
  const { activeWorkspace: workspace } = workspaceStore.getState();
  const {
    data,
    isLoading: projectLogsLoading,
    error: errorLoadingProjectLogs,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["project-logs", workspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/projects/${workspace.id}/logs`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!workspace.id,
  });

  const projectLogsData: Array<Log> = Array.isArray(data?.logs)
    ? data.logs.map((log) => ({
        ...log,
      }))
    : [];

  return { projectLogsData, projectLogsLoading, errorLoadingProjectLogs };
};
export default useGetProjectLogs;
