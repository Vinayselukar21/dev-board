import axios from "@/utils/axios";
import workspaceStore from "@/store/workspaceStore";
import { Task } from "@/app/types";
interface Payload {
  taskId: string | undefined;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  projectId: string;
  stageId: string;
  assignees: string[];
}

interface ApiResponse {
  data: Task;
  message: string;
  error: string;
}

const EditTask = async (payload: Payload): Promise<ApiResponse> => {
  const {activeWorkspace} = workspaceStore.getState()
  const response = await axios.put(`/projects/${activeWorkspace?.id}/updatetask`, payload);
  return response.data as ApiResponse;
};

export default EditTask;
