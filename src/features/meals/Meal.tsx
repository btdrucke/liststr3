import style from "./style.module.css"
import EditableItem from "../../common/EditableItem"
import {deleteMeal, MealModel, renameMeal, toggleMealIsChecked} from "./slice"
import React from "react"
import {useDrag} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"
import {classes} from "../../common/classUtils"
import IsCheckedControl from "../../common/IsCheckedControl"
import {TrashControl} from "../../common/IconControls"
import {useAppSelector} from "../../app/hooks"
import {selectRecipeById} from "../recipes/slice"

interface Props {
    meal: MealModel
}

const Meal = ({meal}: Props) => {
    const recipe = useAppSelector(state => selectRecipeById(state, meal.recipeId))

    const [{isDragging}, drag] = useDrag(() => ({
        type: DragTypes.MEAL,
        item: meal,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    return (
        <div
            ref={drag}
            className={classes(style.meal, isDragging && style.isDragging, meal.isChecked && style.isChecked)}
        >
            <IsCheckedControl
                isChecked={meal.isChecked}
                action={toggleMealIsChecked(meal.id)}
            />
            <EditableItem
                origItem={meal}
                referenceName={recipe?.name}
                renameItem={renameMeal}
                extraClass={classes(style.editableItem, meal.name || style.reference)}
            />
            <TrashControl action={deleteMeal(meal.id)}/>
        </div>
    )
}


export default Meal
