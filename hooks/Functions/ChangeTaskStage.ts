import axios from "@/utils/axios";
import workspaceStore from "@/store/workspaceStore";
import { Task } from "@/app/types";
interface Payload {
  taskId: string;
  stageId: string;
}

interface ApiResponse {
  data: Task;
  message: string;
  error: string;
}

const ChangeTaskStage = async (payload: Payload): Promise<ApiResponse> => {
  const {activeWorkspace} = workspaceStore.getState()
  const response = await axios.put(`/projects/${activeWorkspace?.id}/taskstagechange`, payload);
  return response.data as ApiResponse;
};

export default ChangeTaskStage;
