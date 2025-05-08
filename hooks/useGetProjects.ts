import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import sidebarStore from "@/store/sidebarStore";
import { Project } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";
import { useStore } from "zustand";

interface QueryResponse {
  message: string;
  projects: Project[];
}

const useGetProjects = () => {
  const sidebar = useStore(sidebarStore, (state) => state.sidebar);
  const setSidebar = useStore(sidebarStore, (state) => state.setSidebar);
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace); // subscribes to changes
  const {
    data,
    isLoading: projectsLoading,
    error: errorLoadingProjects,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["projects", activeWorkspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/${activeWorkspace.id}/getall`
      );
      setSidebar({ ...sidebar, projects: res.data.projects });
      return res.data;
    },
    retry: 1,
    enabled: !!activeWorkspace.id,
  });

  const projectData: Array<Project> = Array.isArray(data?.projects)
    ? data.projects.map((project) => ({
        ...project,
      }))
    : [];

  return { projectData, projectsLoading, errorLoadingProjects };
};
export default useGetProjects;
