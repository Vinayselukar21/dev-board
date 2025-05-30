import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import workspaceStore from "@/store/workspaceStore";


interface TaskStage {
  id: string
  name: string
  createdAt: string // or Date if you parse it
  updatedAt: string // or Date if you parse it
  tasksCount: number
}

interface StatsEntry {
  projectStatus: string
  membersCount: number
  taskStages: TaskStage[]
}

interface StatsMap {
  [projectId: string]: StatsEntry
}


interface QueryResponse {
  message: string;
  statsMap: StatsMap;
}



const useGetProjectStats = () => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const {
    data,
    isLoading: projectStatsLoading,
    error: errorLoadingProjectStats,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["project-stats", activeWorkspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/${activeWorkspace.id}/projects/getall/stats`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!activeWorkspace.id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const projectStatsData: StatsMap = data?.statsMap || {};

  return { projectStatsData, projectStatsLoading, errorLoadingProjectStats };
};
export default useGetProjectStats;
