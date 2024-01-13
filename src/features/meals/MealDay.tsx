import {createItem, MealModel, rescheduleMeal} from "./slice"
import {dayOfWeek, isToday, isWeekend} from "../../common/dateUtils"
import style from "./style.module.css"
import {classes} from "../../common/classUtils"
import Meal from "./Meal"
import React from "react"
import {useDrop} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {selectItems as selectRecipes} from '../recipes/slice'
import AddItem from "../../common/AddItem"
import {BaseItem} from "../../common/BaseItem"

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
        dispatch(createItem({name: name, datestamp: datestamp}))
    }

    const onCreateFromSuggestion = (suggestion: BaseItem) => {
        dispatch(createItem({name: suggestion.name, datestamp: datestamp, recipeId: suggestion.id}))
    }

    const rowClass = (isToday(datestamp) && style.today) || (isWeekend(datestamp) && style.weekend)

    return (
        <div className={classes(style.tableRow, rowClass)}>
            <span className={style.tableCell}>
                {dayOfWeek(datestamp)}({datestamp})
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
                />
            </span>
        </div>
    )
}

export default MealDay