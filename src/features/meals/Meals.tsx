import React from "react"
import {MealModel, selectMealItems} from "./slice"
import {useAppSelector} from "../../app/hooks"
import style from "./style.module.css"
import {dayOfWeek, isToday, isWeekend, toDatestamp, toLocalDate} from "../../common/dateUtils"
import _ from "lodash"
import {Dayjs} from "dayjs"
import AddMeal from "./AddMeal"
import {classes} from "../../common/classUtils"
import Meal from "./Meal"

export const Meals = () => {
    const itemList = useAppSelector(selectMealItems)

    const today = toLocalDate()
    const todayPlusWeek = today.add(6, 'day')
    const earliestItem = toLocalDate(_.first(itemList)?.datestamp)
    const latestItemPlusDay = toLocalDate(_.last(itemList)?.datestamp).add(1, 'day')
    const firstDay = today.isBefore(earliestItem, 'day') ? today : earliestItem

    let days: { day: Dayjs, item?: MealModel }[] = []
    for (
        let day = firstDay;
        // while !(day > todayPlusWeek && day > latestItemPlusDay)
        !(day.isAfter(todayPlusWeek, 'day') && day.isAfter(latestItemPlusDay, 'day'));
        day = day.add(1, 'day')
    ) {
        days.push({day: day, item: itemList.find(it => day.isSame(it.datestamp, 'day'))})
    }

    return (
        <div className={style.table}>
            {days.map(({day, item}) => {
                const rowColorClass = (isToday(day) && style.today) || (isWeekend(day) && style.weekend)
                return (
                    <div
                        key={toDatestamp(day)}
                        className={classes(style.tableRow, rowColorClass)}>
                        <span
                            className={style.tableCell}>
                            {dayOfWeek(day)}({toDatestamp(day)})
                        </span>
                        {item === undefined ? (<AddMeal date={day}/>) : (<Meal item={item}/>)}
                    </div>
                )
            })}
        </div>
    )
}
