import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {useAppDispatch} from "../app/hooks"
import {AnyAction} from "@reduxjs/toolkit"
import {faStar} from "@fortawesome/free-solid-svg-icons"
import {faStar as faEmptyStar} from "@fortawesome/free-regular-svg-icons"
import style from "./style.module.css"

interface IsFavoriteControlProps {
    isFavorite: boolean
    action: AnyAction
}

const IsFavoriteControl = ({isFavorite, action}: IsFavoriteControlProps) => {
    const dispatch = useAppDispatch()
    return (
        <div
            className={style.iconControl}
            onClick={() => dispatch(action)}
        >
            <FontAwesomeIcon icon={isFavorite ? faStar : faEmptyStar}/>
        </div>
    )
}

export default IsFavoriteControl
