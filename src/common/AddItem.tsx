import React, {useState} from "react"
import {classes} from "./classUtils"
import style from "./style.module.css"
import SuggestionMenu from "./SuggestionMenu"
import {BaseItem} from "./BaseItem"

interface AddItemProps<T extends BaseItem> {
    placeholder: string
    createFromName: (name: string) => void
    suggestionItems?: T[]
    createFromSuggestion?: (suggestion: T) => void
    createFromNewSuggestion?: (name: string) => void
}

const AddItem = <T extends BaseItem>(
    {
        placeholder,
        createFromName,
        suggestionItems,
        createFromSuggestion,
        createFromNewSuggestion
    }: AddItemProps<T>
) => {
    const [queryStr, setQueryStr] = useState("")

    let element: HTMLInputElement
    let isEditPending = false

    const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        element = event.target as HTMLInputElement
        switch (event.key) {
            case "Enter": {
                //event.preventDefault()
                const name = element.value.trim()
                if (name) {
                    isEditPending = true
                    createFromName(name)
                }
                element.value = ""
                setQueryStr("")
                // Don't blur so that the input is still focused for the next item.
                break
            }
            case "Escape": {
                element.value = ""
                setQueryStr("")
                element.blur()
                break
            }
        }
    }

    const handleOnClick: React.MouseEventHandler = (event) => {
        element = event.target as HTMLInputElement
        element.focus()
    }

    const handleOnBlur: React.FocusEventHandler = (event) => {
        console.log("AddMeal.onBlur")
        element = event.target as HTMLInputElement
        if (!isEditPending) {
            //     element.value = ""
            //     setQueryStr("")
            //     isEditPending = false
        }
        element.blur()
    }

    const handleOnChange: React.ChangeEventHandler = (event) => {
        element = event.target as HTMLInputElement
        const query = element.value.trim()
        setQueryStr(query)
    }

    const handleOnSuggestion = (suggestion: T) => {
        createFromSuggestion && createFromSuggestion(suggestion)
        element.value = ""
        setQueryStr("")
    }

    const handleOnNewSuggestion = (name: string) => {
        createFromNewSuggestion && createFromNewSuggestion(name)
        element.value = ""
        setQueryStr("")
    }

    return (
        <>
            <input
                className={classes(style.addItem)}
                placeholder={placeholder}
                defaultValue={queryStr}
                onKeyUp={handleOnKeyUp}
                onClick={handleOnClick}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
            />
            {queryStr.length > 0 && suggestionItems && (
                <SuggestionMenu
                    queryStr={queryStr}
                    suggestionItems={suggestionItems || []}
                    onSuggestion={handleOnSuggestion}
                    onNewSuggestion={handleOnNewSuggestion}
                />
            )}
        </>
    )
}

export default AddItem