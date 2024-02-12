import React from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import style from "./style.module.css"
import IsFavoriteControl from "../../common/IsFavoriteControl"
import {createRecipe, deleteRecipe, editRecipe, renameRecipe, selectRecipes, toggleRecipeIsFavorite} from "./slice"
import AddItem from "../../common/AddItem"
import {EditControl, TrashControl} from "../../common/IconControls"

export const Recipes = () => {
    const dispatch = useAppDispatch()
    const itemList = useAppSelector(selectRecipes)

    const onCreateFromName = (name: string) => dispatch(createRecipe({name: name}))

    return (
        <>
            <AddItem
                placeholder={'+ new recipe'}
                createFromName={onCreateFromName}
            />
            <div className={style.list}>
                {itemList.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className={style.listItem}
                        >
                            <IsFavoriteControl
                                isFavorite={item.isFavorite}
                                action={toggleRecipeIsFavorite(item.id)}/>
                            <EditControl action={editRecipe(item.id)}/>
                            <EditableItem
                                origItem={item}
                                renameItem={renameRecipe}/>
                            <TrashControl action={deleteRecipe(item.id)}/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}