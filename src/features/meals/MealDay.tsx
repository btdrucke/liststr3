import {Dayjs} from "dayjs"
import {MealModel, rescheduleMeal} from "./slice"
import {isToday, isWeekend, toDatestamp} from "../../common/dateUtils"
import style from "./style.module.css"
import {classes} from "../../common/classUtils"
import Meal from "./Meal"
import React from "react"
import {useDrop} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"
import {useAppDispatch} from "../../app/hooks"
import AddMeal from "./AddMeal"

interface MealDayProps {
    date: Dayjs;
    meals: MealModel[];
}

const MealDay = ({date, meals}: MealDayProps) => {
    const dispatch = useAppDispatch()

    const [{isOver, canDrop}, drop] = useDrop(
        () => ({
            accept: DragTypes.MEAL,
            drop: (draggingItem: MealModel) => {
                dispatch(rescheduleMeal({id: draggingItem.id, datestamp: toDatestamp(date)}))
            },
            canDrop: () => {return true},
            collect: monitor => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            })
        }),
        [toDatestamp(date)]
    )

    const dayOfWeek = (date: Dayjs) => date.format('ddd')
    const rowColorClass = (isToday(date) && style.today) || (isWeekend(date) && style.weekend)
    const datestamp = toDatestamp(date)

    return (
        <div
            className={classes(style.tableRow, rowColorClass)}
        >
            <span
                className={style.tableCell}
            >
                {dayOfWeek(date)}({datestamp})
            </span>
            <span
                ref={drop}
                className={classes(style.tableCell, isOver && canDrop && style.isOver)}
            >
                {meals.map((meal) =>
                    <Meal
                        key={meal.id}
                        meal={meal}
                    />
                )}
                <AddMeal datestamp={datestamp}/>
            </span>
        </div>
    )
}

export default MealDay