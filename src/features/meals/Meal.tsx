import style from "./style.module.css"
import EditableItem from "../../common/EditableItem"
import {deleteItem, MealModel, renameItem, toggleIsChecked} from "./slice"
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
                action={toggleIsChecked(meal.id)}/>
            <EditableItem
                origItem={meal}
                renameItem={renameItem}
                extraClass={classes(style.editableItem)}/>
            <TrashControl action={deleteItem(meal.id)}/>
        </div>
    )
}


export default Meal
