// /:workspaceId/newevent

import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";

export interface Payload {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time: string;
  endTime: string;
  occurrence: 'single' | 'recurring-month' | 'recurring-week';
  participants: string[];

  // Relations
  projectId?: string;

  workspaceId: string;
  type: 'event' | 'meeting' | 'task';
  location?: string;
}


const EditCalendarEvent = async (payload: Payload) => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const response = await axios.put(
    `/workspace/${activeWorkspace?.id}/event/update`,
    payload
  );
  return response.data;
};

export default EditCalendarEvent;
