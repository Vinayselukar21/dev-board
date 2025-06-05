import axios from "@/utils/axios";
import workspaceStore from "@/store/workspaceStore";
interface Payload {
  taskId: string;
  stageId: string;
}

const ChangeTaskStage = async (payload: Payload) => {
  const {activeWorkspace} = workspaceStore.getState()
  const response = await axios.put(`/projects/${activeWorkspace?.id}/taskstagechange`, payload);
  return response.data;
};

export default ChangeTaskStage;
