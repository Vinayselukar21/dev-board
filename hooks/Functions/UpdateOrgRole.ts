import { OrganizationRole } from "@/app/types";
import axios from "@/utils/axios";

interface Payload {
    name: string,
    description: string,
    permissions: string[],
    organizationId: string,
    roleId: string
}

interface ApiResponse {
  data: OrganizationRole;
  message: string;
  error: string;
}

const UpdateOrgRole = async (payload: Payload): Promise<ApiResponse> => {
  const response = await axios.put(
    `/organization/update/role`,
    payload
  );
  return response.data as ApiResponse;
};

export default UpdateOrgRole;   