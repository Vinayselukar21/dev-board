// /:workspaceId/newevent

import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useStore } from "zustand";

export interface Payload {
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

  createdById?: string; // workspace member id
}


const AddNewCalendarEvent = async (payload: Payload) => {
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace); // subscribes to changes
  const response = await axios.post(
    `/workspace/${activeWorkspace?.id}/newevent`,
    payload
  );
  return response.data;
};

export default AddNewCalendarEvent;
