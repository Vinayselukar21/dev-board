// /:workspaceId/newevent

import { CalendarEvent } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";

export interface Payload {
  eventId: string;
}

interface ApiResponse {
  data: CalendarEvent;
  message: string;
  error: string;
}


const CancelCalendarEvent = async (payload: Payload) :Promise<ApiResponse> => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const response = await axios.put(
    `/workspace/${activeWorkspace?.id}/events/cancel/${payload.eventId}`,
    payload
  );
  return response.data as ApiResponse;
};

export default CancelCalendarEvent;
