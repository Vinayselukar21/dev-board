import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import workspaceStore from "@/store/workspaceStore";
import { activeWorkspaceDetails } from "@/utils/activeWorkspaceMemberId";

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
  data: StatsMap;
}



const useGetProjectStats = () => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const {WorkspaceMemberId} = activeWorkspaceDetails()
  const {
    data,
    isLoading: projectStatsLoading,
    error: errorLoadingProjectStats,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["project-stats", activeWorkspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/${activeWorkspace.id}/${WorkspaceMemberId}/projects/getall/stats`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!activeWorkspace.id && !!WorkspaceMemberId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const projectStatsData: StatsMap = data?.data || {};

  return { projectStatsData, projectStatsLoading, errorLoadingProjectStats };
};
export default useGetProjectStats;
