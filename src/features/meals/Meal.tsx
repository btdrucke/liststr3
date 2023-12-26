import style from "./style.module.css"
import EditableItem from "../../common/EditableItem"
import {deleteMeal, MealModel, renameMeal, rescheduleMeal} from "./slice"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import React from "react"
import {useAppDispatch} from "../../app/hooks"
import {useDrag, useDrop} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"
import {classes} from "../../common/classUtils"
import {toLocalDate} from "../../common/dateUtils"

interface MealProps {
    item: MealModel
}

const Meal = ({item}: MealProps) => {
    const dispatch = useAppDispatch()

    const [{isDragging}, drag] = useDrag(() => ({
        type: DragTypes.MEAL,
        item: item,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    const itemDate = toLocalDate(item.datestamp)

    const [{isOver, canDrop}, drop] = useDrop(
        () => ({
            accept: DragTypes.MEAL,
            drop: (item: MealModel) => {
                dispatch(rescheduleMeal({id: item.id, date: itemDate}))
            },
            canDrop: (otherItem) => {
              return item !== otherItem
            },
            collect: monitor => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            })
        }),
        [itemDate]
    )

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={classes(style.tableCell, isOver && canDrop && style.isOver)}
        >
            <EditableItem
                origItem={item}
                renameItem={renameMeal}
                extraClass={classes(style.editableItem, isDragging && style.isDragging)}/>
            <FontAwesomeIcon
                icon={faTrashCan}
                className={classes(isOver && style.isOver, isDragging && style.isDragging)}
                onClick={() => dispatch(deleteMeal(item.id))}/>
        </div>
    )
}


export default Meal
