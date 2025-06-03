// /:workspaceId/newevent

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


const AddNewCalendarEventSeries = async (payload: CalendarEventSeriesPayload) => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const response = await axios.post(
    `/workspace/${activeWorkspace?.id}/neweventseries`,
    payload
  );
  return response.data;
};

export default AddNewCalendarEventSeries;
