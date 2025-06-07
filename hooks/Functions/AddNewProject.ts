import { Project } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";

interface Payload {
  name: string;
  description: string;
  status: string;
  deadline: string | undefined;
  createdById: string;
  members: string[];
}

interface ApiResponse {
  data: Project;
  message: string;
  error: string;
}

const AddNewProject = async (payload: Payload): Promise<ApiResponse> => {
  const {activeWorkspace} = workspaceStore.getState()
  const response = await axios.post(
    `/workspace/${activeWorkspace?.id}/newproject`,
    payload
  );
  return response.data as ApiResponse;
};

export default AddNewProject;