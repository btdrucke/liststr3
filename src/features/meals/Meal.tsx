import style from "./style.module.css"
import EditableItem from "../../common/EditableItem"
import {deleteMeal, MealModel, renameMeal} from "./slice"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import React from "react"
import {useAppDispatch} from "../../app/hooks"
import {useDrag} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"
import {classes} from "../../common/classUtils"

interface MealProps {
    meal: MealModel
}

const Meal = ({meal}: MealProps) => {
    const dispatch = useAppDispatch()

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
            className={classes(isDragging && style.isDragging)}
        >
            <EditableItem
                origItem={meal}
                renameItem={renameMeal}
                extraClass={classes(style.editableItem)}/>
            <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => dispatch(deleteMeal(meal.id))}/>
        </div>
    )
}


export default Meal
