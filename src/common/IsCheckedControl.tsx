import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {useAppDispatch} from "../app/hooks"
import {AnyAction} from "@reduxjs/toolkit"
import {faSquare, faSquareCheck} from "@fortawesome/free-regular-svg-icons"
import {faSquareMinus} from "@fortawesome/free-solid-svg-icons"

interface Props {
    isChecked: boolean | undefined
    action: AnyAction
}

const IsCheckedControl = ({isChecked, action}: Props) => {
    const dispatch = useAppDispatch()
    return (
        <FontAwesomeIcon
            icon={(isChecked === undefined) ? faSquareMinus : (isChecked ? faSquareCheck : faSquare)}
            onClick={() => dispatch(action)}
        />
    )
}

export default IsCheckedControl