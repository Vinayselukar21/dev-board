import axios from "@/utils/axios";

interface Payload {
  projectId: string;
  name: string;
}

const AddNewProjectStage = async (payload: Payload) => {
  const response = await axios.post(`/projects/newstage`, payload);
  return response.data;
};

export default AddNewProjectStage;
