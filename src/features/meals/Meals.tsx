import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {createMeal, deleteMeal, MealModel, renameMeal, selectMealItems} from "./slice"
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import style from "./style.module.css"
import {dayOfWeek, toDatestamp, toLocalDate} from "../../common/dateUtils"
import _ from "lodash"
import {Dayjs} from "dayjs"
import NewMeal from "./NewMeal"

export const Meals = () => {
    const dispatch = useAppDispatch()
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
                return (
                    <div
                        key={toDatestamp(day)}
                        className={style.tableRow}>
                        <span
                            className={style.tableCell}>
                            {dayOfWeek(day)}({toDatestamp(day)})
                        </span>
                        {item === undefined && (
                            <NewMeal
                                date={day}
                                createMeal={createMeal}/>
                        )}
                        {item !== undefined && (
                            <div
                                className={style.tableCell}>
                                <EditableItem
                                    origItem={item}
                                    renameItem={renameMeal}/>
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    onClick={() => dispatch(deleteMeal(item.id))}/>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}