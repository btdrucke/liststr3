import {createMeal, MealModel, rescheduleMeal} from "./slice"
import {dayOfWeek, isToday, isWeekend} from "../../common/dateUtils"
import style from "./style.module.css"
import {classes} from "../../common/classUtils"
import Meal from "./Meal"
import React from "react"
import {useDrop} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {RecipeModel, selectRecipes} from '../recipes/slice'
import AddItem from "../../common/AddItem"
import {nanoid} from "@reduxjs/toolkit"

interface Props {
    datestamp: string
    meals: MealModel[]
}

const MealDay = ({datestamp, meals}: Props) => {
    const dispatch = useAppDispatch()
    const recipes = useAppSelector(selectRecipes)

    const onDrop = (draggingItem: MealModel) => {
        dispatch(rescheduleMeal({id: draggingItem.id, datestamp: datestamp}))
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
        [datestamp]
    )

    const onCreateFromName = (name: string) => {
        dispatch(createMeal({name: name, datestamp: datestamp}))
    }

    const onCreateFromSuggestion = (suggestion: RecipeModel) => {
        dispatch(createMeal({name: suggestion.name, datestamp: datestamp, recipeId: suggestion.id}))
    }

    const onCreateFromNewSuggestion = (name: string) => {
        dispatch(createMeal({name: name, datestamp: datestamp, recipeId: nanoid()}))
    }

    const rowClass = (isToday(datestamp) && style.today) || (isWeekend(datestamp) && style.weekend)

    return (
        <div
            ref={drop}
            className={classes(style.tableRow, rowClass, isOver && canDrop && style.isOver)}
        >
            <span className={style.tableCell}>
                {dayOfWeek(datestamp)}({datestamp})
            </span>
            <span className={classes(style.tableCell)}>
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