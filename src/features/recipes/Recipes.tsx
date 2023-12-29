import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {createRecipe, deleteRecipe, renameRecipe, selectRecipeItems, toggleIsFavorite} from "./slice"
import {faStar, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {faStar as faEmptyStar} from '@fortawesome/free-regular-svg-icons'
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import AddInput from "../../common/AddInput"
import style from "./style.module.css"

export const Recipes = () => {
    const dispatch = useAppDispatch()
    const itemList = useAppSelector(selectRecipeItems)
    return (
        <div className={style.list}>
            <AddInput placeholder={'+ new recipe'} createFromName={createRecipe}/>
            {itemList.map((item) => {
                return (
                    <div
                        key={item.id}>
                        <FontAwesomeIcon
                            icon={item.isFavorite ? faStar : faEmptyStar}
                            onClick={() => dispatch(toggleIsFavorite(item.id))}/>
                        <EditableItem
                            origItem={item}
                            renameItem={renameRecipe}/>
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            onClick={() => dispatch(deleteRecipe(item.id))}/>
                    </div>
                )
            })}
        </div>
    )
}