import {Dayjs} from "dayjs"
import {createItem, MealModel, rescheduleMeal} from "./slice"
import {isToday, isWeekend, toDatestamp} from "../../common/dateUtils"
import style from "./style.module.css"
import {classes} from "../../common/classUtils"
import Meal from "./Meal"
import React from "react"
import {useDrop} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"
import {useAppDispatch} from "../../app/hooks"
import {useSelector} from "react-redux"
import {selectItems as selectRecipes} from '../recipes/slice'
import AddItem from "../../common/AddItem"
import {BaseItem} from "../../common/BaseItem"
import {nanoid} from "@reduxjs/toolkit"

interface MealDayProps {
    date: Dayjs
    meals: MealModel[]
}

const MealDay = ({date, meals}: MealDayProps) => {
    const dispatch = useAppDispatch()
    const recipes = useSelector(selectRecipes)

    const onDrop = (draggingItem: MealModel) => {
        dispatch(rescheduleMeal({id: draggingItem.id, datestamp: toDatestamp(date)}))
    }

    const [{isOver, canDrop}, drop] = useDrop(
        () => ({
            accept: DragTypes.MEAL,
            drop: onDrop,
            canDrop: () => true,
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

    const onCreateFromName = (name: string) => {
        dispatch(createItem({name: name, datestamp: datestamp}))
    }

    const onCreateFromSuggestion = (suggestion: BaseItem) => {
        dispatch(createItem({name: suggestion.name, datestamp: datestamp, recipeId: suggestion.id}))
    }

    const onCreateFromNewSuggestion = (name: string) => {
        dispatch(createItem({name: name, datestamp: datestamp, recipeId: nanoid()}))
    }

    return (
        <div className={classes(style.tableRow, rowColorClass)}>
            <span className={style.tableCell}>
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
                <AddItem
                    placeholder={"+"}
                    createFromName={onCreateFromName}
                    suggestionItems={recipes}
                    createFromSuggestion={onCreateFromSuggestion}
                    createFromNewSuggestion={onCreateFromNewSuggestion}
                />
            </span>
        </div>
    )
}

export default MealDay