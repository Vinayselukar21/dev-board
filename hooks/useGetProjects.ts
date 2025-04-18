import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import sidebarStore from "@/store/sidebarStore";
import { Project } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";

interface QueryResponse {
  message: string;
  projects: Project[];
}

const useGetProjects = () => {
  const { sidebar, setSidebar } = sidebarStore.getState();
  const { activeWorkspace: workspace } = workspaceStore.getState();
  console.log();
  const {
    data,
    isLoading: projectsLoading,
    error: errorLoadingProjects,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["projects", workspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/${workspace.id}/getall`
      );
      setSidebar({ ...sidebar, projects: res.data.projects });
      return res.data;
    },
    retry: 1,
    enabled: !!workspace.id,
  });

  const projectData: Array<Project> = Array.isArray(data?.projects)
    ? data.projects.map((project) => ({
        ...project,
      }))
    : [];

  return { projectData, projectsLoading, errorLoadingProjects };
};
export default useGetProjects;
