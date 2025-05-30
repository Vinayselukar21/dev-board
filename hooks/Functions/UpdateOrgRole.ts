import axios from "@/utils/axios";

interface Payload {
    name: string,
    description: string,
    permissions: string[],
    organizationId: string,
    roleId: string
}

const UpdateOrgRole = async (payload: Payload) => {
  const response = await axios.put(
    `/organization/update/role`,
    payload
  );
  return response.data;
};

export default UpdateOrgRole;   