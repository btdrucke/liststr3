// Returns a new date built from the input date, but with no hour/minute/second/ms values.
import dayjs, {Dayjs} from "dayjs"

export function toDatestamp(date: Dayjs): string {
    return date.format('YYYY-MM-DD')
}

export function todayDatestamp(): string {
    return toDatestamp(dayjs())
}

export function isWeekend(datestamp: string): boolean {
    const date = dayjs(datestamp)
    const dayNum = date.day()
    return dayNum === 0 || dayNum === 6 // Sunday or Saturday
}

export function isToday(datestamp: string): boolean {
    return datestamp === todayDatestamp()
}

export function dayOfWeek(datestamp: string): string {
    return dayjs(datestamp).format('ddd')
}

export function addDays(datestamp: string, numDays: number): string {
    return toDatestamp(dayjs(datestamp).add(numDays, 'day'))
}
