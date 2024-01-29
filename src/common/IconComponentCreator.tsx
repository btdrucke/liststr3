import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {useAppDispatch} from "../app/hooks"
import {AnyAction} from "@reduxjs/toolkit"
import {IconDefinition} from "@fortawesome/free-regular-svg-icons"
import style from "./style.module.css"

interface Props {
    action: AnyAction
}

const IconComponentCreator = (icon: IconDefinition) => ({action}: Props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useAppDispatch()
    return (
        <div
            className={style.iconControl}
            onClick={() => dispatch(action)}
        >
            <FontAwesomeIcon icon={icon}/>
        </div>
    )
}

export default IconComponentCreator