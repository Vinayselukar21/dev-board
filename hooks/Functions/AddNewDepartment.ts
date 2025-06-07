import { Department } from "@/app/types";
import axios from "@/utils/axios";

interface Payload {
  workspaceId: string;
  name: string;
}

interface ApiResponse {
  data: Department;
  message: string;
  error: string;
}

const AddNewDepartment = async (payload: Payload): Promise<ApiResponse> => {
  const response = await axios.post(`/workspace/newdepartment`, payload);
  return response.data as ApiResponse;
};

export default AddNewDepartment;
