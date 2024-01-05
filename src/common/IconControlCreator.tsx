import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {useAppDispatch} from "../app/hooks"
import {AnyAction} from "@reduxjs/toolkit"
import {IconDefinition} from "@fortawesome/free-regular-svg-icons"

interface IconControlProps {
    action: AnyAction
}

const IconControlCreator = (icon: IconDefinition) => ({action}: IconControlProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useAppDispatch()
    return (
        <FontAwesomeIcon
            icon={icon}
            onClick={() => dispatch(action)}
        />
    )
}

export default IconControlCreator