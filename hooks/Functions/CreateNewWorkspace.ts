import { Workspace } from "@/app/types";
import axios from "@/utils/axios";

interface Payload {
  icon: string;
  name: string;
  description: string;
  ownerId: string;
  organizationId: string;
}

interface ApiResponse {
  data: Workspace;
  message: string;
  error: string;
}

const CreateNewWorkspace = async (payload: Payload): Promise<ApiResponse> => {
  const response = await axios.post(`/workspace/create`, payload);
  return response.data as ApiResponse;
};

export default CreateNewWorkspace;
