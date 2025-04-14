import { Project } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";

interface Payload {
  name: string;
  description: string;
  status: string;
  deadline: string | undefined;
  workspaceId: string;
  createdById: string;
  members: string[];
}

const AddNewProject = async (payload: Payload) => {
  const { activeWorkspace } = workspaceStore.getState();
  const response = await axios.post(
    `/workspace/${activeWorkspace?.id}/newproject`,
    payload
  );
  return response.data;
};

export default AddNewProject;