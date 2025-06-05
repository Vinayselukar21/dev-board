// /workspace/cm95g50ef0001cd28xp5u4u3l/members

import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Project } from "../app/types";

interface QueryResponse {
  message: string;
  project: Project;
}

const useGetProjectTasks = (projectId: string) => {
  const {
    data,
    isLoading: tasksLoading,
    error: errorLoadingTasks,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["projectTasks", projectId],
    queryFn: async () => {
      const {activeWorkspace} = workspaceStore.getState()
      const res = await axios.get<QueryResponse>(
        `/projects/${activeWorkspace?.id}/getbyid/${projectId}`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!projectId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const projectTaskData: Project | null = data?.project ? data.project : null;
  return { projectTaskData, tasksLoading, errorLoadingTasks };
};
export default useGetProjectTasks;
