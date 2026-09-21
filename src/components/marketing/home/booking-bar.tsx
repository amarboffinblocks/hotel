"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { CalendarDays, ChevronDown, Minus, Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { buildBookingQuery } from "@/features/booking/utils";
import { cn } from "@/lib/utils";

type BookingBarProps = {
  className?: string;
  compact?: boolean;
};

export function BookingBar({ className }: BookingBarProps) {
  const router = useRouter();
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [checkIn, setCheckIn] = useState<Date>(today);
  const [checkOut, setCheckOut] = useState<Date>(addDays(today, 3));
  const [adults, setAdults] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const nights = Math.max(differenceInCalendarDays(checkOut, checkIn), 1);

  function handleCheckAvailability() {
    router.push(
      buildBookingQuery({
        checkIn: format(checkIn, "yyyy-MM-dd"),
        checkOut: format(checkOut, "yyyy-MM-dd"),
        adults,
        rooms: roomsCount,
      })
    );
  }

  return (
    <div
      className={cn(
        "relative z-40 w-full overflow-hidden rounded-sm border border-[#E8DCCB] bg-white text-foreground shadow-[0_14px_40px_rgba(14,28,23,0.12)]",
        className
      )}
    >
      <div className="grid grid-cols-2 lg:flex lg:items-stretch">
        <DateField
          label="Check-in"
          date={checkIn}
          className="border-r border-b border-[#E8DCCB] lg:border-r lg:border-b-0"
          onSelect={(date) => {
            if (!date) return;
            setCheckIn(date);
            if (date >= checkOut) setCheckOut(addDays(date, 1));
          }}
          disabled={{ before: today }}
        />

        <DateField
          label="Check-out"
          date={checkOut}
          hint={`${nights} night${nights > 1 ? "s" : ""}`}
          className="border-b border-[#E8DCCB] lg:border-r lg:border-b-0"
          onSelect={(date) => {
            if (!date) return;
            setCheckOut(date);
          }}
          disabled={{ before: addDays(checkIn, 1) }}
        />

        <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="group col-span-2 flex w-full items-center gap-2.5 border-b border-[#E8DCCB] px-3 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none sm:gap-3 sm:px-4 sm:py-3.5 lg:col-span-1 lg:flex-1 lg:border-r lg:border-b-0 lg:px-5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary sm:size-10">
                <Users className="size-4 stroke-[1.5] sm:size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-semibold tracking-[0.12em] text-muted-foreground uppercase sm:text-[10px]">
                  Guests & Rooms
                </span>
                <span className="mt-0.5 block truncate text-[13px] font-semibold text-foreground sm:text-sm">
                  {adults} Adult{adults > 1 ? "s" : ""}, {roomsCount} Room
                  {roomsCount > 1 ? "s" : ""}
                </span>
              </span>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[min(20rem,calc(100vw-2rem))] rounded-sm border-[#E8DCCB] p-4 shadow-xl"
          >
            <div className="space-y-4">
              <CounterRow
                label="Adults"
                description="Ages 13+"
                value={adults}
                min={1}
                max={8}
                onChange={setAdults}
              />
              <Separator className="bg-[#E8DCCB]" />
              <CounterRow
                label="Rooms"
                description="Max 3 rooms per booking"
                value={roomsCount}
                min={1}
                max={3}
                onChange={setRoomsCount}
              />
              <Button
                type="button"
                className="mt-1 w-full rounded-sm bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => setGuestsOpen(false)}
              >
                Done
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="col-span-2 flex items-center p-2.5 sm:p-3 lg:min-w-[200px] lg:shrink-0 lg:p-3">
          <Button
            type="button"
            onClick={handleCheckAvailability}
            size="lg"
            className="h-11 w-full rounded-sm text-xs font-bold tracking-[0.1em] uppercase sm:h-12"
          >
            Check Availability
          </Button>
        </div>
      </div>
    </div>
  );
}

function DateField({
  label,
  date,
  hint,
  className,
  onSelect,
  disabled,
}: {
  label: string;
  date: Date;
  hint?: string;
  className?: string;
  onSelect: (date: Date | undefined) => void;
  disabled?: { before: Date };
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "group flex w-full items-center gap-2 px-3 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none sm:gap-3 sm:px-4 sm:py-3.5 lg:flex-1 lg:px-5",
            className
          )}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary sm:size-10">
            <CalendarDays className="size-4 stroke-[1.5] sm:size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[9px] font-semibold tracking-[0.12em] text-muted-foreground uppercase sm:text-[10px]">
              {label}
            </span>
            <span className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
              <span className="text-[13px] font-semibold text-foreground sm:text-sm">
                {format(date, "EEE, MMM d")}
              </span>
              {hint ? (
                <span className="text-[10px] font-medium text-primary sm:text-[11px]">
                  {hint}
                </span>
              ) : null}
            </span>
          </span>
          <ChevronDown className="size-3.5 shrink-0 text-muted-foreground sm:size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto max-w-[calc(100vw-2rem)] overflow-hidden rounded-sm border-[#E8DCCB] p-0 shadow-xl"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}

function CounterRow({
  label,
  description,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 rounded-full border-[#E8DCCB]"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Decrease ${label}`}
        >
          <Minus className="size-3.5" />
        </Button>
        <span className="w-5 text-center text-sm font-semibold tabular-nums">
          {value}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 rounded-full border-[#E8DCCB]"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`Increase ${label}`}
        >
          <Plus className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
