// /:workspaceId/newevent

import { CalendarEvent } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";

export interface CalendarEventSeriesPayload {
  occurrence: any;
  participants: string[];
  seriesTitle: string;
  seriesDescription: string;
  repeatEvery: number;
  repeatFor: "days" | "weeks" | "months" | "years";
  seriesStartDate: Date;
  seriesEndDate: Date | undefined;
}

interface ApiResponse {
  data: CalendarEvent[];
  message: string;
  error: string;
}


const AddNewCalendarEventSeries = async (payload: CalendarEventSeriesPayload): Promise<ApiResponse> => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const response = await axios.post(
    `/workspace/${activeWorkspace?.id}/neweventseries`,
    payload
  );
  return response.data as ApiResponse
};

export default AddNewCalendarEventSeries;
