import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "zustand";

interface QueryResponse {
  message: string;
  dashboard: any;
}

const useGetDashboard = () => {
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace); // subscribes to changes
  console.log(activeWorkspace.id , activeWorkspace.name)
  const {
    data,
    isLoading: dashboardLoading,
    error: errorLoadingDashboard,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["dashboard", activeWorkspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/${activeWorkspace.id}/dashboard`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!activeWorkspace.id,
  });

  const dashboardData = data?.dashboard;

  return { dashboardData, dashboardLoading, errorLoadingDashboard };
};
export default useGetDashboard;
