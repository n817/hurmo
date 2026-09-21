/** Consultations run on the hour, Tashkent time. */
export const FIRST_SLOT_HOUR = 10;
export const LAST_SLOT_HOUR = 18;
export const TIME_ZONE = "Asia/Tashkent";
export const TIME_ZONE_LABEL = "Tashkent time";

/** Bookings must be at least this far out. */
const LEAD_TIME_HOURS = 24;

interface Moment {
  date: string; // YYYY-MM-DD
  hour: number;
  minute: number;
}

/**
 * The current instant expressed as Tashkent wall-clock time, so the lead time
 * is computed in the same clock the client picks slots in.
 */
function tashkentNow(now: Date): Moment {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((part) => part.type === type)!.value;

  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    // Intl can render midnight as "24" in some engines.
    hour: Number(get("hour")) % 24,
    minute: Number(get("minute")),
  };
}

function addDays(date: string, days: number): string {
  const shifted = new Date(`${date}T00:00:00Z`);
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted.toISOString().slice(0, 10);
}

/** The moment a booking may first start: now plus the lead time. */
function earliestStart(now: Date): Moment {
  const current = tashkentNow(now);
  const carried = current.hour + LEAD_TIME_HOURS;

  return {
    date: addDays(current.date, Math.floor(carried / 24)),
    hour: carried % 24,
    minute: current.minute,
  };
}

/** Slot hours still bookable on `date`; empty when the day is fully past. */
export function availableHours(date: string, now: Date = new Date()): number[] {
  if (!date) {
    return [];
  }

  const earliest = earliestStart(now);
  if (date < earliest.date) {
    return [];
  }

  const hours: number[] = [];
  for (let hour = FIRST_SLOT_HOUR; hour <= LAST_SLOT_HOUR; hour += 1) {
    // On the first bookable day, drop slots that fall inside the lead time.
    const tooSoon =
      date === earliest.date &&
      (hour < earliest.hour || (hour === earliest.hour && earliest.minute > 0));

    if (!tooSoon) {
      hours.push(hour);
    }
  }

  return hours;
}

/** First day that still has a bookable slot — the `min` of the date input. */
export function earliestBookableDate(now: Date = new Date()): string {
  const earliest = earliestStart(now);

  return availableHours(earliest.date, now).length
    ? earliest.date
    : addDays(earliest.date, 1);
}

export function formatHour(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}
