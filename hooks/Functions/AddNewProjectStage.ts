import { TaskStage } from "@/app/types";
import axios from "@/utils/axios";

interface Payload {
  projectId: string;
  name: string;
}

interface ApiResponse {
  data: TaskStage;
  message: string;
  error: string;
}

const AddNewProjectStage = async (payload: Payload): Promise<ApiResponse> => {
  const response = await axios.post(`/projects/newstage`, payload);
  return response.data as ApiResponse;
};

export default AddNewProjectStage;
