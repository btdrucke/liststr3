// Returns a new date built from the input date, but with no hour/minute/second/ms values.
import {apply} from "./utils"

export function withNoTime(date: Date): Date {
    return apply(date, d => d.setHours(0, 0, 0, 0))
}

export function dayOfWeekDisplay(date: Date): string {
    return date.toLocaleDateString([], {weekday: 'short'})
}

