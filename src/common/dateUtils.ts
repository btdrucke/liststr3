// Returns a new date built from the input date, but with no hour/minute/second/ms values.
import dayjs, {Dayjs, isDayjs} from "dayjs"

export function dayOfWeek(date: Dayjs | string): string {
    const dateObj = isDayjs(date) ? date : dayjs(date)
    return dateObj.format('ddd')
}

export function toDatestamp(date: Dayjs = dayjs()): string {
    return date.format('YYYY-MM-DD')
}

export function toLocalDate(datestamp?: string | undefined): Dayjs {
    return dayjs(datestamp || toDatestamp())
}

