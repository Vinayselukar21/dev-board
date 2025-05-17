import axios from "@/utils/axios";

interface Payload {
  workspaceId: string;
  name: string;
}

const AddNewDepartment = async (payload: Payload) => {
  const response = await axios.post(`/workspace/newdepartment`, payload);
  return response.data;
};

export default AddNewDepartment;
