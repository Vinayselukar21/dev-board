import axios from "@/utils/axios";

interface Payload {
  taskId: string;
  stageId: string;
}

const ChangeTaskStage = async (payload: Payload) => {
  const response = await axios.put(`/projects/taskstagechange`, payload);
  return response.data;
};

export default ChangeTaskStage;
