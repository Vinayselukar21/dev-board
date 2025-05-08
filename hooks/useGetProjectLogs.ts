import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Log } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";
import { useStore } from "zustand";

interface QueryResponse {
  message: string;
  logs: Log[];
}

const useGetProjectLogs = () => {
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace); // subscribes to changes
  const {
    data,
    isLoading: projectLogsLoading,
    error: errorLoadingProjectLogs,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["project-logs", activeWorkspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/projects/${activeWorkspace.id}/logs`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!activeWorkspace.id,
  });

  const projectLogsData: Array<Log> = Array.isArray(data?.logs)
    ? data.logs.map((log) => ({
        ...log,
      }))
    : [];

  return { projectLogsData, projectLogsLoading, errorLoadingProjectLogs };
};
export default useGetProjectLogs;
