import axios from "@/utils/axios";

interface Payload {
    name: string,
    description: string,
    permissions: string[],
    organizationId: string
}

const AddNewOrgRole = async (payload: Payload) => {
  const response = await axios.post(
    `/organization/new/customrole`,
    payload
  );
  return response.data;
};

export default AddNewOrgRole;   