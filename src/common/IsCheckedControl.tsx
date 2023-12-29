import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {useAppDispatch} from "../app/hooks"
import {AnyAction} from "@reduxjs/toolkit"
import {faStar, faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {faSquare, faSquareCheck, faStar as faEmptyStar} from "@fortawesome/free-regular-svg-icons"

interface IsCheckedControlProps {
    isChecked: boolean
    action: AnyAction
}

const IsCheckedControl = ({isChecked, action}: IsCheckedControlProps) => {
    const dispatch = useAppDispatch()
    return (
        <FontAwesomeIcon
            icon={isChecked ? faSquareCheck: faSquare}
            onClick={() => dispatch(action)}
        />
    )
}

export default IsCheckedControl