// /:workspaceId/newevent

import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { CalendarEventPayload } from "./AddNewCalendarEvent";


const EditCalendarEvent = async (payload: CalendarEventPayload) => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const response = await axios.put(
    `/workspace/${activeWorkspace?.id}/event/update`,
    payload
  );
  return response.data;
};

export default EditCalendarEvent;
