import axios from "@/utils/axios";
import workspaceStore from "@/store/workspaceStore";

const DeleteTask = async (taskId: string) => {
  const {activeWorkspace} = workspaceStore.getState()
  const response = await axios.delete(`/projects/${activeWorkspace?.id}/task/delete/${taskId}`);
  return response.data;
};
export default DeleteTask;
