import axios from "@/utils/axios";
import workspaceStore from "@/store/workspaceStore";
import { Task } from "@/app/types";
interface Payload {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  projectId: string;
  stageId: string;
  createdById: string; // should not go from frontend - task
  assignees: string[];
}

interface ApiResponse {
  data: Task;
  message: string;
  error: string;
}

const AddNewTask = async (payload: Payload): Promise<ApiResponse> => {
  const {activeWorkspace} = workspaceStore.getState()
  const response = await axios.post(`/projects/${activeWorkspace?.id}/newtask`, payload);
  return response.data as ApiResponse;
};

export default AddNewTask;
