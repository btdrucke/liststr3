import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {useAppDispatch} from "../app/hooks"
import {AnyAction} from "@reduxjs/toolkit"
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"

interface TrashControlProps {
    action: AnyAction
}

const TrashControl = ({action}: TrashControlProps) => {
    const dispatch = useAppDispatch()
    return (
        <FontAwesomeIcon
            icon={faTrashCan}
            onClick={() => dispatch(action)}
        />
    )
}

export default TrashControl