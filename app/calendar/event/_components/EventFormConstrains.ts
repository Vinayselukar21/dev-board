import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// Define the form schema with Zod
const eventFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    date: z.date({
      required_error: "Please select a date",
    }),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().optional(),
    eventType: z.enum(["meeting", "event"], {
      required_error: "Please select an event type",
    }),
    occurrence: z.enum(["single", "recurring-month", "recurring-week"], {
      required_error: "Please select occurrence type",
    }),
    status: z.enum(["active", "cancelled"], {
      required_error: "Please select event status",
    }),
    projectId: z.string().optional(),
    location: z.string().optional(),
    participants: z.array(z.string()),
  });
  
  export type EventFormValues = z.infer<typeof eventFormSchema>;
  
export default function EventFormConstrains() {
    console.log("form constrains called ------------------------------------------------------------------------");
     // Initialize form with defaults or event data
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      eventType: "meeting",
      occurrence: "single",
      projectId: "",
      location: "",
      participants: [],
      status: "active",
    },
  });

  return {form,};
}
