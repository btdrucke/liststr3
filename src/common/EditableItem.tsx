import React from "react"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"
import {useAppDispatch} from "../app/hooks"
import {classes} from "./classUtils"
import {BaseItem} from "./BaseItem"
import style from "./style.module.css"
import {normalizeMatches} from "./searchUtils"

export interface EditableItemProps {
    origItem: BaseItem
    referenceName?: string
    renameItem: ActionCreatorWithPayload<BaseItem>
    extraClass?: string
}

const EditableItem = ({origItem, referenceName, renameItem, extraClass}: EditableItemProps) => {
    const dispatch = useAppDispatch()
    let isEditPending = false

    if (!origItem.name && !referenceName) {
        console.error("EditableItem: no origItem or referenceName provided")
    }
    const defaultName = origItem.name || referenceName || ""

    const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const element = event.target as HTMLInputElement
        switch (event.key) {
            case "Enter": {
                event.preventDefault()
                const trimmedName = element.value.trim()
                const newName = trimmedName ? trimmedName : undefined
                // - if entry is not blank and matches reference name, rename item to no name to ensure there no custom name
                // - if entry is not blank and is different from the item's custom name, then rename
                // - if entry is blank and meal has a reference name, rename item to no name to ensure there no custom name
                // - if entry is blank and meal has no reference name, then reset entry to the name the item started with
                if (newName) {
                    const renameName = normalizeMatches(newName, referenceName) ? undefined : newName
                    if (renameName !== origItem.name) {
                        isEditPending = true
                        dispatch(renameItem({id: origItem.id, name: renameName}))
                    }
                } else if (referenceName && origItem.name) {
                    isEditPending = true
                    dispatch(renameItem({id: origItem.id, name: undefined}))
                }
                element.blur()
                break
            }
            case "Escape": {
                element.value = defaultName
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
            element.value = defaultName
            isEditPending = false
        }
        element.blur()
    }

    return (
        <input
            className={classes(style.editableItem, extraClass)}
            defaultValue={defaultName}
            placeholder={referenceName}
            onKeyUp={handleOnKeyUp}
            onClick={handleOnClick}
            onBlur={handleOnBlur}
        />
    )
}

export default EditableItem