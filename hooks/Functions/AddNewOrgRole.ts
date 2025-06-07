import { OrganizationRole } from "@/app/types";
import axios from "@/utils/axios";

interface Payload {
    name: string,
    description: string,
    permissions: string[],
    organizationId: string
}

interface ApiResponse {
  data: OrganizationRole;
  message: string;
  error: string;
}

const AddNewOrgRole = async (payload: Payload): Promise<ApiResponse> => {
  const response = await axios.post(
    `/organization/new/customrole`,
    payload
  );
  return response.data as ApiResponse;
};

export default AddNewOrgRole;