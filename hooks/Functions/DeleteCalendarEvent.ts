// /:workspaceId/newevent

import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";

interface ApiResponse {
  message: string;
  error: string;
}

const DeleteCalendarEvent = async (eventId: string): Promise<ApiResponse> => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const response = await axios.delete(
    `/workspace/${activeWorkspace?.id}/events/delete/${eventId}`
  );
  return response.data as ApiResponse;
};

export default DeleteCalendarEvent;
