import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {createIngredient, renameIngredient, deleteIngredient} from "./slice"
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import AddInput from "../../common/AddInput"
import style from "./style.module.css"

export const Ingredients = () => {
    const itemList = useAppSelector((state) => state.ingredients.items)
    const dispatch = useAppDispatch()
    return (
        <div className={style.list}>
            <AddInput placeholder={'+ new store'} createFromName={createIngredient}/>
            {itemList.map((item) => {
                return (
                    <div
                        key={item.id}>
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