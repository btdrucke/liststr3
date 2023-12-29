import React from "react"
import {createRecipe, deleteRecipe, renameRecipe, selectRecipeItems, toggleIsFavorite} from "./slice"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import AddInput from "../../common/AddInput"
import style from "./style.module.css"
import TrashControl from "../../common/TrashControl"
import IsFavoriteControl from "../../common/IsFavoriteControl"

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
                        <IsFavoriteControl
                            isFavorite={item.isFavorite}
                            action={toggleIsFavorite(item.id)}/>
                        <EditableItem
                            origItem={item}
                            renameItem={renameRecipe}/>
                        <TrashControl action={deleteRecipe(item.id)}/>
                    </div>
                )
            })}
        </div>
    )
}