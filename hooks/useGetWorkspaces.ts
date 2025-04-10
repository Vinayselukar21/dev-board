import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../app/providers/AuthProvider";
import { Workspace } from "../app/types";

interface QueryResponse {
  message: string;
  workspaces: Workspace[];
}

const useGetWorkspaces = () => {
  const { session } = useAuth();
  const {
    data,
    isLoading: workspacesLoading,
    error: errorLoadingWorkspaces,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["workspaces", session?.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/getall/${session?.id || ""}`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!session?.id,
  });

  const workspaceData: Array<Workspace> = Array.isArray(data?.workspaces)
    ? data?.workspaces.map(
        ({ name, description, id, createdAt, updatedAt, ownerId }) => ({
          name,
          description,
          id,
          createdAt,
          updatedAt,
          ownerId,
        })
      )
    : [];


  return { workspaceData, workspacesLoading, errorLoadingWorkspaces };
};
export default useGetWorkspaces;
