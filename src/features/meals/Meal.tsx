import style from "./style.module.css"
import EditableItem from "../../common/EditableItem"
import {deleteMeal, MealModel, renameMeal, toggleMealIsChecked} from "./slice"
import React from "react"
import {useDrag} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"
import {classes} from "../../common/classUtils"
import IsCheckedControl from "../../common/IsCheckedControl"
import {TrashControl} from "../../common/IconControls"

interface Props {
    meal: MealModel
}

const Meal = ({meal}: Props) => {
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
                action={toggleMealIsChecked(meal.id)}/>
            <EditableItem
                origItem={meal}
                renameItem={renameMeal}
                extraClass={classes(style.editableItem)}/>
            <TrashControl action={deleteMeal(meal.id)}/>
        </div>
    )
}


export default Meal
