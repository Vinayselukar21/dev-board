import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";

interface Payload {
    userIds: string[];
    roleId: string;
    departmentId: string;
}

const AddUserToWorkspace = async (payload: Payload) => {
    const {activeWorkspace} = workspaceStore.getState()
    if(!activeWorkspace){
        throw new Error("No active workspace found");
    }
  const response = await axios.post(`/workspace/${activeWorkspace.id}/addmember`, payload);
  return response.data;
};

export default AddUserToWorkspace;
