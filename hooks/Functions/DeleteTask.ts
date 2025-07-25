import axios from "@/utils/axios";
import workspaceStore from "@/store/workspaceStore";

interface ApiResponse {
  message: string;
  error: string;
}

const DeleteTask = async (taskId: string): Promise<ApiResponse> => {
  const {activeWorkspace} = workspaceStore.getState()
  const response = await axios.delete(`/projects/${activeWorkspace?.id}/task/delete/${taskId}`);
  return response.data as ApiResponse;
};
export default DeleteTask;
