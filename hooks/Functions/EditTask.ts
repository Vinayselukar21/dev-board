import axios from "@/utils/axios";
import workspaceStore from "@/store/workspaceStore";
interface Payload {
    taskId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  projectId: string;
  stageId: string;
  assignees: string[];
}

const EditTask = async (payload: Payload) => {
  const {activeWorkspace} = workspaceStore.getState()
  const response = await axios.put(`/projects/${activeWorkspace?.id}/updatetask`, payload);
  return response.data;
};

export default EditTask;
