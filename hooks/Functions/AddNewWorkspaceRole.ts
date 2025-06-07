import { WorkspaceRole } from "@/app/types";
import axios from "@/utils/axios";

interface Payload {
    name: string,
    description: string,
    permissions: string[],
    workspaceId: string
}

interface ApiResponse {
  data: WorkspaceRole;
  message: string;
  error: string;
}

const AddNewWorkspaceRole = async (payload: Payload): Promise<ApiResponse> => {
  const response = await axios.post(
    `/workspace/new/customrole`,
    payload
  );
  return response.data as ApiResponse;
};

export default AddNewWorkspaceRole;   