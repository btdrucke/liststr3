import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {createIngredient, renameIngredient, toggleIsFavorite, deleteIngredient, selectIngredientItems} from "./slice"
import {faStar, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {faStar as faEmptyStar} from '@fortawesome/free-regular-svg-icons'
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import AddInput from "../../common/AddInput"
import style from "./style.module.css"

export const Ingredients = () => {
    const dispatch = useAppDispatch()
    const itemList = useAppSelector(selectIngredientItems)
    return (
        <div className={style.list}>
            <AddInput placeholder={'+ new ingredient'} createFromName={createIngredient}/>
            {itemList.map((item) => {
                return (
                    <div
                        key={item.id}>
                        <FontAwesomeIcon
                            icon={item.isFavorite ? faStar : faEmptyStar}
                            onClick={() => dispatch(toggleIsFavorite(item.id))}/>
                        <EditableItem
                            origItem={item}
                            renameItem={renameIngredient}/>
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            onClick={() => dispatch(deleteIngredient(item.id))}/>
                    </div>
                )
            })}
        </div>
    )
}