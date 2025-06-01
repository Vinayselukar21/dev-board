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
import { differenceInDays, differenceInMonths, differenceInYears, getMonth, getWeek, intervalToDuration } from "date-fns"
import { array } from "zod"

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    setAllOccurences,
    seriesTitle,
    setSeriesTitle,
    seriesDescription,
    setSeriesDescription,
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
    setAllOccurences: (occurences: { dateObj: Date; date: number; day: string; month: number; year: number; monthDesc: string }[]) => void;
    seriesTitle: string;
    setSeriesTitle: (seriesTitle: string) => void;
    seriesDescription: string;
    setSeriesDescription: (seriesDescription: string) => void;
    trigger: React.ReactNode;
}) {
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState<Date | undefined>(date);


    useEffect(() => {
        if (startDate) {
            setDate(startDate);
        }
    }, [startDate]);

    const numbers = Array.from({ length: 99 }, (_, i) => i + 1);
    const getAllOccurences = () => {
        const sd = new Date(date!);
        const ed = new Date(endDate!);
        const dates: { dateObj: Date; date: number; day: string; month: number; year: number; monthDesc: string }[] = [];

        let currentDate = new Date(sd);

        while (currentDate <= ed) {

            const dateObj = {
                dateObj: new Date(currentDate),
                date: currentDate.getDate(),
                day: weekdays[currentDate.getDay()],
                month: currentDate.getMonth(),
                year: currentDate.getFullYear(),
                week: getWeek(currentDate),
                monthDesc: months[currentDate.getMonth()],
            }

            //   Day Difference Logic
            const lastDate = dates.length > 0 ? dates[dates.length - 1] : {
                dateObj: sd,
                date: sd.getDate(),
                day: weekdays[sd.getDay()],
                month: sd.getMonth(),
                year: sd.getFullYear(),
                week: getWeek(sd),
                monthDesc: months[sd.getMonth()],
            };
            const dateString = `${lastDate?.monthDesc} ${lastDate?.date}, ${lastDate?.year}`;
            const lastDateObj = new Date(dateString);
            const dayDiff = differenceInDays(currentDate, lastDateObj);

            //   Week Difference Logic
            const lastWeekDate = dates.length > 1 ? dates[dates.length - 1] : {
                dateObj: sd,
                date: sd.getDate(),
                day: weekdays[sd.getDay()],
                month: sd.getMonth(),
                year: sd.getFullYear(),
                week: getWeek(sd),
                monthDesc: months[sd.getMonth()],
            };
            const lastWeekDateString = `${lastWeekDate?.monthDesc} ${lastWeekDate?.date}, ${lastWeekDate?.year}`;
            const lastWeekDateObj = new Date(lastWeekDateString);
            const weekDiff = getWeek(currentDate) - getWeek(lastWeekDateObj);

            // Month Difference Logic
            const lastMonthDate = dates.length > 1 ? dates[dates.length - 1] : {
                dateObj: sd,
                date: sd.getDate(),
                day: weekdays[sd.getDay()],
                month: sd.getMonth(),
                year: sd.getFullYear(),
                week: getWeek(sd),
                monthDesc: months[sd.getMonth()],
            };
            const lastMonthDateString = `${lastMonthDate?.monthDesc} ${lastMonthDate?.date}, ${lastMonthDate?.year}`;
            const lastMonthDateObj = new Date(lastMonthDateString);
            const monthDiff = differenceInMonths(currentDate, lastMonthDateObj);

            // Year Difference Logic
            const lastYearDate = dates.length > 1 ? dates[dates.length - 1] : {
                dateObj: sd,
                date: sd.getDate(),
                day: weekdays[sd.getDay()],
                month: getMonth(sd),
                year: sd.getFullYear(),
                week: getWeek(sd),
                monthDesc: months[sd.getMonth()],
            };
            const lastYearDateString = `${lastYearDate?.monthDesc} ${lastYearDate?.date}, ${lastYearDate?.year}`;
            const lastYearDateObj = new Date(lastYearDateString);
            const yearDiff = differenceInYears(currentDate, lastYearDateObj);

            if (repeatEvery === 1 && repeatFor === "days" && selectedDays.includes(dateObj.day)) {
                dates.push(dateObj);
            }

            if (repeatEvery > 1 && repeatFor === "days") {
                if (dates.length === 0) {
                    dates.push(dateObj);
                }
                else if (dayDiff === repeatEvery) {
                    dates.push(dateObj);
                }

            }

            if (repeatEvery === 1 && repeatFor === "weeks" && selectedDays.includes(dateObj.day)) {
                dates.push(dateObj);
            }

            if (repeatEvery > 1 && repeatFor === "weeks" && selectedDays.includes(dateObj.day)) {
                if (dates.length === 0) {
                    dates.push(dateObj);
                }
                else if (weekDiff === repeatEvery || weekDiff === 0) {
                    dates.push(dateObj);
                }
            }

            if (repeatEvery === 1 && repeatFor === "months" && dateObj.date === sd.getDate()) {
                dates.push(dateObj);
            }

            if (repeatEvery > 1 && repeatFor === "months" && dateObj.date === sd.getDate()) {
                if (dates.length === 0) {
                    dates.push(dateObj);
                }
                else if (monthDiff === repeatEvery) {
                    dates.push(dateObj);
                }
            }

            if (repeatEvery === 1 && repeatFor === "years" && dateObj.date === sd.getDate() && dateObj.month === sd.getMonth()) {
                dates.push(dateObj);
            }

            if (repeatEvery > 1 && repeatFor === "years" && dateObj.date === sd.getDate() && dateObj.month === sd.getMonth() && dateObj.year === sd.getFullYear()) {
                if (dates.length === 0) {
                    dates.push(dateObj);
                }
                else if (yearDiff === repeatEvery) {
                    dates.push(dateObj);
                }
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }
        // console.log(dates, "all dates")
        return dates;
    }

    function GenerateText(repeatFor: "days" | "weeks" | "months" | "years") {
        let string = ""
        if (repeatFor === "days" && open) {
            string = `Occurs  ${repeatEvery === 1 ? "every" : repeatEvery === 2 ? "every other" : `every ${repeatEvery}`} ${selectedDays.length === 7 ? "every day" : selectedDays.join(", ")} ${endDate !== undefined ? `until ${endDate.toDateString()}` : ""}`

            setSeriesTitle("Daily")
            setSeriesDescription(string)
        }
        else if (repeatFor === "weeks" && open) {
            string = `Occurs  ${repeatEvery === 1 ? "every" : repeatEvery === 2 ? "every other" : `every ${repeatEvery}`} ${selectedDays.length > 1 ? repeatFor.split("s")[0] + " on" : ""}  ${selectedDays.join(", ")} ${endDate !== undefined ? `until ${endDate.toDateString()}` : ""}`
            setSeriesTitle("Weekly")
            setSeriesDescription(string)
        }
        else if (repeatFor === "months" && open) {
            string = `Occurs ${"on day " + startDate?.getDate() || ""} ${repeatEvery === 1 ? "every" : repeatEvery === 2 ? "of every other" : "of every " + repeatEvery} ${repeatFor} ${endDate !== undefined ? `until ${endDate.toDateString()}` : ""}`
            setSeriesTitle("Monthly")
            setSeriesDescription(string)
        }
        else if (repeatFor === "years" && open) {
            string = `Occurs ${repeatEvery === 1 ? "every" : repeatEvery === 2 ? "of every other" : "of every " + repeatEvery} ${repeatFor} ${endDate !== undefined ? `until ${endDate.toDateString()}` : ""}`
            setSeriesTitle("Yearly")
            setSeriesDescription(string)
        }
        return string
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                            {repeatFor === "days" &&
                                <div className="flex gap-2 flex-wrap items-center text-sm text-muted-foreground">
                                    <p>{GenerateText(repeatFor)}</p>

                                    {endDate === undefined && !endDateOpen && <Button variant="link" className="p-0 text-muted-foreground cursor-pointer hover:text-black hover:underline" onClick={() => setEndDateOpen(!endDateOpen)}>
                                        Select end date
                                    </Button>}

                                    {endDate !== undefined &&
                                        <Button variant="link" className="p-0 text-muted-foreground cursor-pointer hover:text-black hover:underline" onClick={() => {
                                            setEndDate(undefined);
                                            setEndDateOpen(false);
                                        }}>
                                            Remove end date
                                        </Button>}
                                </div>}

                            {repeatFor === "weeks" && <div className="flex gap-2 flex-wrap items-center text-sm text-muted-foreground">
                                <p>{GenerateText(repeatFor)}</p> {endDate === undefined && !endDateOpen && <Button variant="link" className="p-0 text-muted-foreground cursor-pointer hover:text-black hover:underline" onClick={() => setEndDateOpen(!endDateOpen)}>
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
                            <p>{GenerateText(repeatFor)}</p> {endDate === undefined && !endDateOpen && <Button variant="link" className="p-0 text-muted-foreground cursor-pointer hover:text-black hover:underline" onClick={() => setEndDateOpen(!endDateOpen)}>
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
                    {
                        repeatFor === "years" &&
                        <div className="flex gap-2 flex-wrap items-center text-sm text-muted-foreground">
                            <p>{GenerateText(repeatFor)}</p> {endDate === undefined && !endDateOpen && <Button variant="link" className="p-0 text-muted-foreground cursor-pointer hover:text-black hover:underline" onClick={() => setEndDateOpen(!endDateOpen)}>
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
                        <Button variant="outline" onClick={() => {
                            setAllOccurences([]);
                            setOpen(false);
                        }}>Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={endDate === undefined} onClick={() => {
                        setAllOccurences(getAllOccurences())
                        setOpen(false);
                    }}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
