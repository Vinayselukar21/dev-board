// /:workspaceId/newevent

import { CalendarEvent } from "@/app/types";
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

interface ApiResponse {
  data: CalendarEvent;
  message: string;
  error: string;
}

const AddNewCalendarEvent = async (payload: CalendarEventPayload): Promise<ApiResponse> => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const response = await axios.post(
    `/workspace/${activeWorkspace?.id}/newevent`,
    payload
  );
  return response.data as ApiResponse;
};

export default AddNewCalendarEvent;
