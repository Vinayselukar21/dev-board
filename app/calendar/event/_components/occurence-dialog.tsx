import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DatePicker from "@/components/date-picker"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useEffect } from "react"
import { cn } from "@/lib/utils"

export function OccurenceDialog({
    date,
    setDate,
    endDate,
    setEndDate,
    endDateOpen,
    setEndDateOpen,
    repeatEvery,
    repeatFor,
    setRepeatEvery,
    setRepeatFor,
    selectedDays,
    setSelectedDays,
    trigger,
}: {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    endDate: Date | undefined;
    setEndDate: (endDate: Date | undefined) => void;
    endDateOpen: boolean;
    setEndDateOpen: (endDateOpen: boolean) => void;
    repeatEvery: number;
    repeatFor: "days" | "weeks" | "months" | "years";
    setRepeatEvery: (repeatEvery: number) => void;
    setRepeatFor: (repeatFor: "days" | "weeks" | "months" | "years") => void;
    selectedDays: string[];
    setSelectedDays: (selectedDays: string[]) => void;
    trigger: React.ReactNode;
}) {
    const [startDate, setStartDate] = React.useState<Date | undefined>(date);
   

    useEffect(() => {
        if (startDate) {
            setDate(startDate);
        }
    }, [startDate]);

    const numbers = Array.from({ length: 99 }, (_, i) => i + 1);
    const handleOccurenceChange = () => {
        console.log({
            date,
            endDate,
            endDateOpen,
            repeatEvery,
            repeatFor,
            selectedDays,
        })
    }

    console.log(selectedDays)
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Occurence</DialogTitle>
                    <DialogDescription>
                        Select the type of occurence you want to edit.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <DatePicker
                            Date={startDate}
                            setDate={setStartDate}
                            label="Start"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-3">
                            <Label>Repeat every</Label>
                            <Select
                                value={repeatEvery.toString()}
                                onValueChange={(value) => setRepeatEvery(Number(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={
                                        repeatEvery.toString()
                                    } />
                                </SelectTrigger>
                                <SelectContent>
                                    {numbers.map((number) => (
                                        <SelectItem key={number} value={number.toString()}>
                                            {number}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label>Repeat for</Label>
                            <Select
                                value={repeatFor}
                                onValueChange={(value) => setRepeatFor(value as "days" | "weeks" | "months" | "years")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={
                                        repeatFor
                                    } />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="days">Days</SelectItem>
                                    <SelectItem value="weeks">Weeks</SelectItem>
                                    <SelectItem value="months">Months</SelectItem>
                                    <SelectItem value="years">Years</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {(repeatFor === "weeks" || repeatFor === "days") &&

                        <div className="grid gap-3">
                            {((repeatFor === "days" && repeatEvery === 1) || repeatFor === "weeks") && <div className="grid grid-cols-8 gap-2">
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                    <div className={cn(
                                        "flex items-center justify-center border rounded-full p-2 hover:bg-gray-100 hover:text-black cursor-pointer text-sm font-medium transition-colors",
                                        selectedDays.includes(day) && "bg-black text-white hover:bg-black hover:text-white"
                                    )} key={day} onClick={() => {
                                        if (selectedDays.includes(day)) {
                                            selectedDays.length > 1 ?
                                                setSelectedDays(selectedDays.filter((d) => d !== day)) : null;
                                        } else {
                                            setSelectedDays([...selectedDays, day]);
                                        }
                                    }}>
                                        {day.slice(0, 3)}
                                    </div>
                                ))}

                            </div>}
                            {repeatFor === "weeks" && <div className="flex gap-2 flex-wrap items-center text-sm text-muted-foreground">
                                <p>Occurs  {repeatEvery === 1 ? "every" : repeatEvery === 2 ? "every other" : `every ${repeatEvery}`} {selectedDays.length > 1 ? repeatFor.split("s")[0] + " on" : ""}  {selectedDays.join(", ")} {endDate !== undefined ? `until ${endDate.toDateString()}` : ""}</p> {endDate === undefined && !endDateOpen && <Button variant="link" className="p-0 text-muted-foreground cursor-pointer hover:text-black hover:underline" onClick={() => setEndDateOpen(!endDateOpen)}>
                                    Select end date
                                </Button>}
                                {endDate !== undefined && <Button variant="link" className="p-0 text-muted-foreground cursor-pointer hover:text-black hover:underline" onClick={() => {
                                    setEndDate(undefined);
                                    setEndDateOpen(false);
                                }}>
                                    Remove end date
                                </Button>}
                            </div>}

                            {repeatFor === "days" && <div className="flex gap-2 flex-wrap items-center text-sm text-muted-foreground">
                                <p>Occurs  {repeatEvery === 1 ? "every" : repeatEvery === 2 ? "every other" : `every ${repeatEvery}`} {selectedDays.length === 7 ? "every day" : selectedDays.join(", ")} {endDate !== undefined ? `until ${endDate.toDateString()}` : ""}</p> {endDate === undefined && !endDateOpen && <Button variant="link" className="p-0 text-muted-foreground cursor-pointer hover:text-black hover:underline" onClick={() => setEndDateOpen(!endDateOpen)}>
                                    Select end date
                                </Button>}
                                {endDate !== undefined && <Button variant="link" className="p-0 text-muted-foreground cursor-pointer hover:text-black hover:underline" onClick={() => {
                                    setEndDate(undefined);
                                    setEndDateOpen(false);
                                }}>
                                    Remove end date
                                </Button>}
                            </div>}
                        </div>

                    }
                    {
                        repeatFor === "months" &&
                        <div className="flex gap-2 flex-wrap items-center text-sm text-muted-foreground">
                            <p>Occurs {"on day " + startDate?.getDate() || ""} {repeatEvery === 1 ? "every" : repeatEvery === 2 ? "of every other" : `of every ${repeatEvery}`} {repeatFor} {endDate !== undefined ? `until ${endDate.toDateString()}` : ""}</p> {endDate === undefined && !endDateOpen && <Button variant="link" className="p-0 text-muted-foreground cursor-pointer hover:text-black hover:underline" onClick={() => setEndDateOpen(!endDateOpen)}>
                                Select end date
                            </Button>}
                            {endDate !== undefined && <Button variant="link" className="p-0 text-muted-foreground cursor-pointer hover:text-black hover:underline" onClick={() => {
                                setEndDate(undefined);
                                setEndDateOpen(false);
                        }}>
                            Remove end date
                        </Button>}
                    </div>
                    }
                    {endDateOpen && endDate === undefined && <div className="grid gap-2">
                                <DatePicker
                                    Date={endDate}
                                    setDate={setEndDate}
                                    label="End"
                                />
                            </div>}

                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleOccurenceChange}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
