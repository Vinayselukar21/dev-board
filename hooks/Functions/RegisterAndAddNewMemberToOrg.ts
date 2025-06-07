import { User } from "@/app/types";
import axios from "@/utils/axios";

interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  roleId: string; 
  workspaceId?: string;
  departmentId?: string;
  organizationId: string;
  jobTitle?: string;
  contactNo?: string;
  location?: string;
  organizationRoleId?: string;
  designation?: string;
}

interface ApiResponse {
  data: User;
  message: string;
  error: string;
}

const RegisterAndAddNewMemberToOrg = async (
  payload: RegisterUserPayload
): Promise<ApiResponse> => {
  const response = await axios.post(`/organization/new/orgmember`, payload);
  return response.data as ApiResponse;
};

export default RegisterAndAddNewMemberToOrg;
