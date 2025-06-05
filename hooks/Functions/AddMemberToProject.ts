import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";

interface Payload {
  projectId: string;
  memberId: string;
}

const AddMemberToProject = async (payload: Payload) => {
  const { activeWorkspace} = workspaceStore.getState()
  const response = await axios.post(`/projects/${activeWorkspace.id}/addmember`, payload);
  return response.data;
};

export default AddMemberToProject;
