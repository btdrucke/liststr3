import React from "react"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"
import {useAppDispatch} from "../app/hooks"
import {classes} from "./classUtils"
import {BaseItem} from "./BaseItem"
import style from "./common.module.css"

export interface EditableItemProps {
    origItem: BaseItem;
    renameItem: ActionCreatorWithPayload<BaseItem>;
    extraClasses?: string[] | string
}

// NB: Trailing comma in type list.
const EditableItem = ({origItem, renameItem, extraClasses}: EditableItemProps) => {
    const dispatch = useAppDispatch()
    let isEditPending = false

    const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const element = event.target as HTMLInputElement
        switch (event.key) {
            case "Enter": {
                event.preventDefault()
                const newName = element.value.trim()
                if (newName && newName !== origItem.name) {
                    isEditPending = true
                    dispatch(renameItem({id: origItem.id, name: newName}))
                }
                element.blur()
                break
            }
            case "Escape": {
                element.value = origItem.name
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
            element.value = origItem.name
            isEditPending = false
        }
        element.blur()
    }

    return (
        <input
            className={classes(style.editableItem, extraClasses)}
            defaultValue={origItem.name}
            onKeyUp={handleOnKeyUp}
            onClick={handleOnClick}
            onBlur={handleOnBlur}
        />
    )
}

export default EditableItem