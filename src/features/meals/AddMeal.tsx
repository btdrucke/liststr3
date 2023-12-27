import React from "react"
import {useAppDispatch} from "../../app/hooks"
import {classes} from "../../common/classUtils"
import style from "./style.module.css"
import {createMeal, MealModel, rescheduleMeal} from "./slice"
import {useDrop} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"

interface AddMealProps {
    datestamp: string
}

const AddMeal = ({datestamp}: AddMealProps) => {
    const dispatch = useAppDispatch()

    let isEditPending = false

    const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const element = event.target as HTMLInputElement
        switch (event.key) {
            case "Enter": {
                event.preventDefault()
                const name = element.value.trim()
                if (name) {
                    isEditPending = true
                    dispatch(createMeal({name: name, datestamp: datestamp}))
                }
                element.value = ""
                // Don't blur so that the input is still focused for the next item.
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
            className={classes(style.editableItem)}
            placeholder="+"
            onKeyUp={handleOnKeyUp}
            onClick={handleOnClick}
            onBlur={handleOnBlur}
        />
    )
}

export default AddMeal