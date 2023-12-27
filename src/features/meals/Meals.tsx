import React from "react"
import {MealModel, selectMealItems} from "./slice"
import {useAppSelector} from "../../app/hooks"
import style from "./style.module.css"
import {toDatestamp} from "../../common/dateUtils"
import _ from "lodash"
import dayjs, {Dayjs} from "dayjs"
import MealDay from "./MealDay"

type MealDayModel = { date: Dayjs, meals: MealModel[] }

export const Meals = () => {
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

    const meals = useAppSelector(selectMealItems)
    const days = calculateMealDays(dayjs(), meals)

    console.log("Rendering Meals")

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
