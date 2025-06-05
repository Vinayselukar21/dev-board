import axios from "@/utils/axios";
import workspaceStore from "@/store/workspaceStore";
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

const AddNewTask = async (payload: Payload) => {
  const {activeWorkspace} = workspaceStore.getState()
  const response = await axios.post(`/projects/${activeWorkspace?.id}/newtask`, payload);
  return response.data;
};

export default AddNewTask;
