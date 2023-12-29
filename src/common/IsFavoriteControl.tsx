import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {useAppDispatch} from "../app/hooks"
import {AnyAction} from "@reduxjs/toolkit"
import {faStar} from "@fortawesome/free-solid-svg-icons"
import {faStar as faEmptyStar} from "@fortawesome/free-regular-svg-icons"

interface IsFavoriteControlProps {
    isFavorite: boolean
    action: AnyAction
}

const IsFavoriteControl = ({isFavorite, action}: IsFavoriteControlProps) => {
    const dispatch = useAppDispatch()
    return (
        <FontAwesomeIcon
            icon={isFavorite ? faStar : faEmptyStar}
            onClick={() => dispatch(action)}
        />
    )
}

export default IsFavoriteControl
