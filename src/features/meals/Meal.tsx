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

    // const [{isOver, draggingItem}, drop] = useDrop(
    //     () => ({
    //         accept: DragTypes.MEAL,
    //         drop: () => {dispatch(rescheduleMeal({id: draggingItem.id, date: date}))},
    //         collect: monitor => ({
    //             isOver: monitor.isOver(),
    //             draggingItem: monitor.getItem<MealModel>()
    //         })
    //     }),
    //     [date]
    // )

    return (
        <div
            ref={drag}
            className={classes(style.tableCell, isDragging && style.dragging)}
        >
            <EditableItem
                origItem={item}
                renameItem={renameMeal}
                extraClasses={style.editableItem}/>
            <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => dispatch(deleteMeal(item.id))}/>
        </div>
    )
}


export default Meal
