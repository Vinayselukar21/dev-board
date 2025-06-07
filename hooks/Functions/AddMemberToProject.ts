import { ProjectMember } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";

interface Payload {
  projectId: string;
  memberId: string;
}

interface ApiResponse {
  data: ProjectMember;
  message: string;
  error: string;
}

const AddMemberToProject = async (payload: Payload): Promise<ApiResponse> => {
  const { activeWorkspace} = workspaceStore.getState()
  const response = await axios.post(`/projects/${activeWorkspace.id}/addmember`, payload);
  return response.data as ApiResponse;
};

export default AddMemberToProject;
