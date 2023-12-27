// Returns a new date built from the input date, but with no hour/minute/second/ms values.
import dayjs, {Dayjs} from "dayjs"

export function toDatestamp(date: Dayjs): string {
    return date.format('YYYY-MM-DD')
}

export function currentDateStamp(): string {
    return toDatestamp(dayjs())
}

export function isWeekend(date: Dayjs): boolean {
    const dayNum = date.day()
    return dayNum === 0 || dayNum === 6 // Sunday or Saturday
}

export function isToday(date: Dayjs):boolean {
    return dayjs().isSame(date, 'day')
}