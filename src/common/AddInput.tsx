import React from "react"
import {useAppDispatch} from "../app/hooks"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"
import style from "./common.module.css"
import {NameOwner} from "./NameOwner"

interface AddInputProps {
    placeholder: string;
    createFromName: ActionCreatorWithPayload<NameOwner>
}
const AddInput = ({placeholder, createFromName}: AddInputProps) => {
    const dispatch = useAppDispatch()

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault()
            const input = event.target as HTMLInputElement
            const newName = input.value.trim()
            if (newName) {
                dispatch(createFromName({name:newName}))
            }
            input.value = ""
        }
    }
    return (
        <input
            className={style.addInput}
            placeholder={placeholder}
            onKeyUp={handleKeyUp}
        />
    )
}

export default AddInput