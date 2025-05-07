// /:workspaceId/newevent

import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";


export interface Payload {
  eventId: string;
}


const CancelCalendarEvent = async (payload: Payload) => {
  const { activeWorkspace } = workspaceStore.getState();
  const response = await axios.put(
    `/workspace/${activeWorkspace?.id}/events/cancel/${payload.eventId}`,
    payload
  );
  return response.data;
};

export default CancelCalendarEvent;
