import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {useAppDispatch} from "../app/hooks"
import {AnyAction} from "@reduxjs/toolkit"
import {faPencil} from "@fortawesome/free-solid-svg-icons"

interface EditControlProps {
    action: AnyAction
}

const EditControl = ({action}: EditControlProps) => {
    const dispatch = useAppDispatch()
    return (
        <FontAwesomeIcon
            icon={faPencil}
            onClick={() => dispatch(action)}
        />
    )
}

export default EditControl