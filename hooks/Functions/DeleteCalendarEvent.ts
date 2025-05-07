// /:workspaceId/newevent

import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";


const DeleteCalendarEvent = async (eventId: string) => {
  const { activeWorkspace } = workspaceStore.getState();
  const response = await axios.delete(
    `/workspace/${activeWorkspace?.id}/events/delete/${eventId}`
  );
  return response.data;
};

export default DeleteCalendarEvent;
