import axios from "@/utils/axios";

interface Payload {
  icon: string;
  name: string;
  description: string;
  ownerId: string;
}

const CreateNewWorkspace = async (payload: Payload) => {
  const response = await axios.post(`/workspace/create`, payload);
  return response.data;
};

export default CreateNewWorkspace;
