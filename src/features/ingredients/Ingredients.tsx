import React from "react"
import {createIngredient, deleteIngredient, renameIngredient, selectIngredientItems, toggleIsFavorite} from "./slice"
import {useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import AddInput from "../../common/AddInput"
import style from "./style.module.css"
import TrashControl from "../../common/TrashControl"
import IsFavoriteControl from "../../common/IsFavoriteControl"

export const Ingredients = () => {
    const itemList = useAppSelector(selectIngredientItems)
    return (
        <div className={style.list}>
            <AddInput placeholder={'+ new ingredient'} createFromName={createIngredient}/>
            {itemList.map((item) => {
                return (
                    <div
                        key={item.id}>
                        <IsFavoriteControl
                            isFavorite={item.isFavorite}
                            action={toggleIsFavorite(item.id)}/>
                        <EditableItem
                            origItem={item}
                            renameItem={renameIngredient}/>
                        <span>{new Date(item.lastUsedTimestamp).toLocaleDateString()}</span>
                        <TrashControl action={deleteIngredient(item.id)}/>
                    </div>
                )
            })}
        </div>
    )
}