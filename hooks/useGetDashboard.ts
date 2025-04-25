import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface QueryResponse {
  message: string;
  dashboard: any;
}

const useGetDashboard = () => {
  const { activeWorkspace: workspace } = workspaceStore.getState();
  const {
    data,
    isLoading: dashboardLoading,
    error: errorLoadingDashboard,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["dashboard", workspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/${workspace.id}/dashboard`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!workspace.id,
  });

  const dashboardData = data?.dashboard;

  return { dashboardData, dashboardLoading, errorLoadingDashboard };
};
export default useGetDashboard;
