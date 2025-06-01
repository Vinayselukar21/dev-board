import { useAuth } from "@/app/providers/AuthProvider";
import { CalendarEvent } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface QueryResponse {
  message: string;
  calendarEvents: CalendarEvent[];
}

const useGetCalendarEvents = ( month: number, year: number ) => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const { session } = useAuth();

  const workspaceMemberId = session.memberships.find(
    (m: any) => m.workspaceId === activeWorkspace.id
  )?.id;

  const {
    data,
    isLoading: eventsLoading,
    error: errorLoadingEvents,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["calendar-events", activeWorkspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/${activeWorkspace.id}/${workspaceMemberId}/events/getall/${month}/${year}`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!activeWorkspace.id && !!workspaceMemberId && !!month && !!year,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const eventsData: CalendarEvent[] = data?.calendarEvents || [];

  return { eventsData, eventsLoading, errorLoadingEvents };
};
export default useGetCalendarEvents;
