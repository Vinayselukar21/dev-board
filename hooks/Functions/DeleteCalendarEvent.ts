// /:workspaceId/newevent

import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useStore } from "zustand";

const DeleteCalendarEvent = async (eventId: string) => {
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace); // subscribes to changes
  const response = await axios.delete(
    `/workspace/${activeWorkspace?.id}/events/delete/${eventId}`
  );
  return response.data;
};

export default DeleteCalendarEvent;
