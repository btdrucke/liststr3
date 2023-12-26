import React from "react"
import {useAppDispatch} from "../../app/hooks"
import {classes} from "../../common/classUtils"
import style from "./style.module.css"
import {Dayjs} from "dayjs"
import {createMeal, MealModel, rescheduleMeal} from "./slice"
import {useDrop} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"

interface AddMealProps {
    date: Dayjs
}

const AddMeal = ({date}: AddMealProps) => {
    const dispatch = useAppDispatch()

    const [{isOver}, drop] = useDrop(
        () => ({
            accept: DragTypes.MEAL,
            drop: (item: MealModel) => {dispatch(rescheduleMeal({id: item.id, date: date}))},
            collect: monitor => ({
                isOver: monitor.isOver()
            })
        }),
        [date]
    )

    let isEditPending = false

    const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const element = event.target as HTMLInputElement
        switch (event.key) {
            case "Enter": {
                event.preventDefault()
                const name = element.value.trim()
                if (name) {
                    isEditPending = true
                    dispatch(createMeal({name: name, date: date}))
                }
                element.blur()
                break
            }
            case "Escape": {
                element.value = ""
                element.blur()
                break
            }
        }
    }

    const handleOnClick = (event: React.MouseEvent<HTMLInputElement>) => {
        const element = event.target as HTMLInputElement
        element.focus()
    }

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const element = event.target as HTMLInputElement
        if (!isEditPending) {
            element.value = ""
            isEditPending = false
        }
        element.blur()
    }

    return (
        <input
            ref={drop}
            className={classes(style.editableItem, style.tableCell, isOver && style.isOver)}
            placeholder="+"
            onKeyUp={handleOnKeyUp}
            onClick={handleOnClick}
            onBlur={handleOnBlur}
        />
    )
}

export default AddMeal