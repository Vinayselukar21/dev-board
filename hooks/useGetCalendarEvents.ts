import { useAuth } from "@/app/providers/AuthProvider";
import { CalendarEvent } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface QueryResponse {
  message: string;
  calendarEvents: CalendarEvent[];
}

const useGetCalendarEvents = () => {
  const { activeWorkspace: workspace } = workspaceStore.getState();
  const { session } = useAuth();

  const workspaceMemberId = session.memberships.find(
    (m: any) => m.workspaceId === workspace.id
  )?.id;

  const {
    data,
    isLoading: eventsLoading,
    error: errorLoadingEvents,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["calendar-events", workspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/${workspace.id}/${workspaceMemberId}/events/getall`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!workspace.id && !!workspaceMemberId,
  });

  const eventsData: CalendarEvent[] = data?.calendarEvents || [];

  return { eventsData, eventsLoading, errorLoadingEvents };
};
export default useGetCalendarEvents;
