import {useSelector} from "react-redux"
import {editItem, selectEditingItem} from "../recipes/slice"
import React from "react"
import TrashControl from "../../common/TrashControl"

export const Recipe = () => {
    const editingRecipe = useSelector(selectEditingItem)
    return (
        <>
            {editingRecipe && (
                <>
                    <span>Editing recipe {editingRecipe.name}</span>
                    <TrashControl action={editItem()}/>
                </>
            )}
            {!editingRecipe && (
                <div>Recipe</div>
            )}
        </>
    )
}