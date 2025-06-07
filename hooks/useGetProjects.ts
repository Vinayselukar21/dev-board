import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import sidebarStore from "@/store/sidebarStore";
import { Project } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";
import { activeWorkspaceDetails } from "@/utils/activeWorkspaceMemberId";

interface QueryResponse {
  message: string;
  data: Project[];
}

const useGetProjects = () => {
  const {sidebar , setSidebar} = sidebarStore.getState()
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const {WorkspaceMemberId} = activeWorkspaceDetails()
  const {
    data,
    isLoading: projectsLoading,
    error: errorLoadingProjects,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["projects", activeWorkspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/${activeWorkspace.id}/${WorkspaceMemberId}/projects/getall`
      );
      setSidebar({ ...sidebar, projects: res.data.data });
      return res.data;
    },
    retry: 1,
    enabled: !!activeWorkspace.id && !!WorkspaceMemberId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const projectData: Array<Project> = Array.isArray(data?.data)
    ? data.data.map((project) => ({
        ...project,
      }))
    : [];

  return { projectData, projectsLoading, errorLoadingProjects };
};
export default useGetProjects;
