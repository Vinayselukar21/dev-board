// /workspace/cm95g50ef0001cd28xp5u4u3l/members

import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { TaskStage } from "../app/types";

interface QueryResponse {
  message: string;
  tasks: TaskStage[];
}

const useGetProjectTasks = (projectId: string) => {
  const {
    data,
    isLoading: tasksLoading,
    error: errorLoadingTasks,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["tasks", projectId],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/projects/${projectId}/tasks`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!projectId,
  });
  const taskData: Array<TaskStage> = Array.isArray(data?.tasks)
    ? data?.tasks.map(
        ({ id, name, createdAt, updatedAt, projectId, project, tasks }) => ({
          id,
          name,
          createdAt,
          updatedAt,
          projectId,
          project,
          tasks,
        })
      )
    : [];

  return { taskData, tasksLoading, errorLoadingTasks };
};
export default useGetProjectTasks;
