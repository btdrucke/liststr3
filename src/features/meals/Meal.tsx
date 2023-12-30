import style from "./style.module.css"
import EditableItem from "../../common/EditableItem"
import {deleteMeal, MealModel, renameMeal, toggleIsChecked} from "./slice"
import React from "react"
import {useDrag} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"
import {classes} from "../../common/classUtils"
import TrashControl from "../../common/TrashControl"
import IsCheckedControl from "../../common/IsCheckedControl"

interface MealProps {
    meal: MealModel
}

const Meal = ({meal}: MealProps) => {
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
            className={classes(isDragging && style.isDragging, meal.isChecked && style.isChecked)}
        >
            <IsCheckedControl
                isChecked={meal.isChecked}
                action={toggleIsChecked(meal.id)}/>
            <EditableItem
                origItem={meal}
                renameItem={renameMeal}
                extraClass={classes(style.editableItem)}/>
            <TrashControl action={deleteMeal(meal.id)}/>
        </div>
    )
}


export default Meal
