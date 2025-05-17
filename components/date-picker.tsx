"use client";

import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DatePickerProps {
  Date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  label: string;
  disabled?: boolean;
}

export default function DatePicker({
  Date,
  setDate,
  label,
  disabled = false,
}: DatePickerProps) {
  return (
    <>
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !Date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {Date ? format(Date, "PPP") : "Select a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            className="z-50 bg-white border rounded-md mt-1 shadow-sm opacity-100"
            mode="single"
            selected={Date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
