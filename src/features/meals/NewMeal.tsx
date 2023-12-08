import React from "react"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"
import {useAppDispatch} from "../../app/hooks"
import {classes} from "../../common/classUtils"
import style from "./style.module.css"
import {Dayjs} from "dayjs"

export interface NewMealProps {
    date: Dayjs
    createMeal: ActionCreatorWithPayload<{ name: string, date?: Dayjs }>
}

// NB: Trailing comma in type list.
const NewMeal = ({date, createMeal}: NewMealProps) => {
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
                    dispatch(createMeal({name:name, date:date}))
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
            className={classes(style.editableItem, style.tableCell)}
            placeholder="+"
            onKeyUp={handleOnKeyUp}
            onClick={handleOnClick}
            onBlur={handleOnBlur}
        />
    )
}

export default NewMeal