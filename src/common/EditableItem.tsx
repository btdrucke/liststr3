import React, {FocusEventHandler} from "react"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"
import {useAppDispatch} from "../app/hooks"
import {BaseItem} from "./BaseItem"
import style from "./common.module.css"
import {classes} from "./classUtils"

interface EditableItemProps<T extends BaseItem> {
    origItem: T;
    renameItem: ActionCreatorWithPayload<BaseItem>;
    extraClasses?: string[]
}

// NB: Trailing comma in type list.
const EditableItem = <T extends BaseItem, >({origItem, renameItem, extraClasses}: EditableItemProps<T>) => {
    const dispatch = useAppDispatch()

    const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const element = event.target as HTMLInputElement
        switch (event.key) {
            case "Enter": {
                event.preventDefault()
                const newName = element.value.trim()
                if (newName && newName !== origItem.name) {
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
        element.value = origItem.name
        element.blur()
    }

    return (
        <input
            className={classes(style.editableItem, ...(extraClasses || []))}
            defaultValue={origItem.name}
            onKeyUp={handleOnKeyUp}
            onClick={handleOnClick}
            onBlur={handleOnBlur}/>
    )
}

export default EditableItem