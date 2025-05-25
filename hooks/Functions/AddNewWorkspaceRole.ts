import axios from "@/utils/axios";

interface Payload {
    name: string,
    description: string,
    permissions: string[],
    workspaceId: string
}

const AddNewWorkspaceRole = async (payload: Payload) => {
  const response = await axios.post(
    `/workspace/new/customrole`,
    payload
  );
  return response.data;
};

export default AddNewWorkspaceRole;   