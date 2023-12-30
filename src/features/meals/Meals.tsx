import React, {useMemo, useState} from "react"
import {MealModel, selectItems} from "./slice"
import {useAppSelector} from "../../app/hooks"
import style from "./style.module.css"
import {toDatestamp} from "../../common/dateUtils"
import _ from "lodash"
import dayjs, {Dayjs} from "dayjs"
import MealDay from "./MealDay"

type MealDayModel = { date: Dayjs, meals: MealModel[] }

export const Meals = () => {
    const meals = useAppSelector(selectItems)
    const [today, setToday] = useState(dayjs())

    const otherToday = dayjs()
    if (!otherToday.isSame(today, 'day')) {
        setToday(otherToday)
    }

    const calculateMealDays = (today: Dayjs, meals: MealModel[]): MealDayModel[]  => {
        const todayPlusWeek = today.add(6, 'day')
        const earliestItem = dayjs(_.first(meals)?.datestamp)
        const latestItemPlusDay = dayjs(_.last(meals)?.datestamp).add(1, 'day')
        const firstDate = today.isBefore(earliestItem, 'day') ? today : earliestItem

        let days: MealDayModel[] = []
        for (
            let date = firstDate;
            !(date.isAfter(todayPlusWeek, 'day') && date.isAfter(latestItemPlusDay, 'day'));
            date = date.add(1, 'day')
        ) {
            days.push({date: date, meals: meals.filter(it => date.isSame(it.datestamp, 'day'))})
        }
        return days
    }

    const days = useMemo(() => calculateMealDays(today, meals), [today, meals])

    return (
        <div className={style.table}>
            {days.map(({date, meals}) =>
                <MealDay
                    key={toDatestamp(date)}
                    date={date}
                    meals={meals}
                />
            )}
        </div>
    )
}
