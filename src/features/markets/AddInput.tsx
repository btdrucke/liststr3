import React, {useState} from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {createMarket} from "./marketsSlice"

type AddInputProps = {
    placeholder: string
}
const AddInput = ({placeholder}: AddInputProps) => {
    const dispatch = useAppDispatch()

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault()
            const input = event.target as HTMLInputElement
            const newName = input.value.trim()
            if (newName) {
                dispatch(createMarket(newName))
            }
            input.value = ""
        }
    }
    return (
        <input
            className="item-add"
            placeholder={placeholder}
            onKeyUp={handleKeyUp}
        />
    )
}

export default AddInput