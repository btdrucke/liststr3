import React, {useState} from "react"
import {useAppDispatch} from "../../app/hooks"
import {classes} from "../../common/classUtils"
import style from "./style.module.css"
import {createMeal} from "./slice"
import SuggestionMenu from "./SuggstionMenu"
import {BaseItem} from "../../common/BaseItem"

interface AddMealProps {
    datestamp: string
}

const AddMeal = ({datestamp}: AddMealProps) => {
    const dispatch = useAppDispatch()
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
                    dispatch(createMeal({name: name, datestamp: datestamp}))
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
        // if (!isEditPending) {
        //     element.value = ""
        //     setQueryStr("")
        //     isEditPending = false
        // }
        element.blur()
    }

    const handleOnChange: React.ChangeEventHandler = (event) => {
        element = event.target as HTMLInputElement
        const query = element.value.trim()
        setQueryStr(query)
    }

    const handleOnSuggestion = (recipe: BaseItem) => {
        console.log(`Create meal from recipe: ${JSON.stringify(recipe)}`)
        dispatch(createMeal({name: recipe.name, datestamp: datestamp, recipeId: recipe.id}))
        element.value = ""
        setQueryStr("")
    }

    return (
        <>
            <input
                className={classes(style.editableItem)}
                placeholder="+"
                defaultValue={queryStr}
                onKeyUp={handleOnKeyUp}
                onClick={handleOnClick}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
            />
            {queryStr.length > 0 && <SuggestionMenu queryStr={queryStr} onSuggestion={handleOnSuggestion}/>}
        </>
    )
}

export default AddMeal