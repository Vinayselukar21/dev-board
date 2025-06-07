// /:workspaceId/newevent

import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { CalendarEventPayload } from "./AddNewCalendarEvent";
import { CalendarEvent } from "@/app/types";

interface ApiResponse {
  data: CalendarEvent;
  message: string;
  error: string;
}

const EditCalendarEvent = async (payload: CalendarEventPayload): Promise<ApiResponse> => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const response = await axios.put(
    `/workspace/${activeWorkspace?.id}/event/update`,
    payload
  );
  return response.data as ApiResponse;
};

export default EditCalendarEvent;
