import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useStore } from "zustand";

interface Payload {
  name: string;
  description: string;
  status: string;
  deadline: string | undefined;
  createdById: string;
  members: string[];
}

const AddNewProject = async (payload: Payload) => {
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace); // subscribes to changes
  const response = await axios.post(
    `/workspace/${activeWorkspace?.id}/newproject`,
    payload
  );
  return response.data;
};

export default AddNewProject;