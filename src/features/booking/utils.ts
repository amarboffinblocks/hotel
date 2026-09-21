import { differenceInCalendarDays, format, parseISO } from "date-fns";

export type BookingSearchParams = {
  checkIn: string;
  checkOut: string;
  adults: number;
  rooms: number;
};

export function nightsBetween(checkIn: string, checkOut: string) {
  const start = parseISO(checkIn);
  const end = parseISO(checkOut);
  return Math.max(differenceInCalendarDays(end, start), 1);
}

export function formatDisplayDate(isoDate: string) {
  return format(parseISO(isoDate), "EEE, MMM d");
}

export function buildBookingQuery(params: BookingSearchParams) {
  const query = new URLSearchParams({
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    adults: String(params.adults),
    rooms: String(params.rooms),
  });
  return `/rooms?${query.toString()}`;
}
