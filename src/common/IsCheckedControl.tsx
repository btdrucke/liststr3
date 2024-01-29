import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {useAppDispatch} from "../app/hooks"
import {AnyAction} from "@reduxjs/toolkit"
import {faSquare, faSquareCheck, faSquareMinus} from "@fortawesome/free-regular-svg-icons"
import style from "./style.module.css"

interface Props {
    isChecked: boolean | undefined
    action: AnyAction
}

const IsCheckedControl = ({isChecked, action}: Props) => {
    const dispatch = useAppDispatch()
    return (
        <div
            className={style.iconControl}
            onClick={() => dispatch(action)}
        >
            <FontAwesomeIcon
                icon={(isChecked === undefined) ? faSquareMinus : (isChecked ? faSquareCheck : faSquare)}
            />
        </div>
    )
}

export default IsCheckedControl