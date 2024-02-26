import {createMeal, createMealFromNewRecipe, createMealFromRecipeId, MealModel, rescheduleMeal} from "./slice"
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
        dispatch(createMealFromRecipeId({datestamp: datestamp, recipeId: suggestion.id}))
    }

    const onCreateFromNewSuggestion = (name: string) => {
        dispatch(createMealFromNewRecipe({datestamp: datestamp, recipeName: name}))
    }

    const rowClass = (isToday(datestamp) && style.today) || (isWeekend(datestamp) && style.weekend)

    return (
        <div
            ref={drop}
            className={classes(style.tableRow, rowClass, isOver && canDrop && style.isOver)}
        >
            <div className={style.tableCell}>
                {dayOfWeek(datestamp)} ({datestamp.substring(6)})
            </div>
            <div className={classes(style.tableCell)}>
                {meals.map((meal) =>
                    <Meal
                        key={meal.id}
                        meal={meal}
                    />
                )}
                <AddItem
                    className={style.addItem}
                    placeholder={"+"}
                    createFromName={onCreateFromName}
                    suggestionItems={recipes}
                    createFromSuggestion={onCreateFromSuggestion}
                    createFromNewSuggestion={onCreateFromNewSuggestion}
                />
            </div>
        </div>
    )
}

export default MealDay