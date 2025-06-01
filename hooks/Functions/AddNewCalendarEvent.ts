// /:workspaceId/newevent

import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";

export interface CalendarEventPayload {
  id?: string;
  title: string;
  description?: string;
  date: Date;
  time: string;
  endTime: string;
  occurrence: 'single' | 'recurring';
  participants: string[];

  // Relations
  projectId?: string;

  workspaceId: string;
  type: 'event' | 'meeting';
  location?: string;

  status: "active" | "cancelled";

  createdById?: string; // workspace member id
}


const AddNewCalendarEvent = async (payload: CalendarEventPayload) => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const response = await axios.post(
    `/workspace/${activeWorkspace?.id}/newevent`,
    payload
  );
  return response.data;
};

export default AddNewCalendarEvent;
