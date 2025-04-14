import axios from "@/utils/axios";

interface Payload {
  projectId: string;
  memberId: string;
}

const AddMemberToProject = async (payload: Payload) => {
  const response = await axios.post(`/projects/addmember`, payload);
  return response.data;
};

export default AddMemberToProject;
