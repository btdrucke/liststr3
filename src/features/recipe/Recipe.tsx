import {addIngredientToRecipe, editRecipe, removeFromRecipe, selectEditingRecipe} from "../recipes/slice"
import {IngredientModel, selectIngredients} from "../ingredients/slice"
import React from "react"
import AddItem from "../../common/AddItem"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {DoneControl, TrashControl} from "../../common/IconControls"
import style from "../recipes/style.module.css"
import {nanoid} from "@reduxjs/toolkit"
import {findById} from "../../common/IdOwner"

export const Recipe = () => {
    const dispatch = useAppDispatch()
    const ingredients = useAppSelector(selectIngredients)
    const editingRecipe = useAppSelector(selectEditingRecipe)

    const onCreateFromName = (name: string) => {
        if (editingRecipe) {
            dispatch(addIngredientToRecipe({id: editingRecipe.id, ingredientName: name}))
        }
    }

    const onCreateFromNewSuggestion = (name: string) => {
        if (editingRecipe) {
            dispatch(addIngredientToRecipe({id: editingRecipe.id, ingredientName: name, ingredientId: nanoid()}))
        }
    }

    const onCreateFromSuggestion = (suggestion: IngredientModel) => {
        if (editingRecipe) {
            dispatch(addIngredientToRecipe({id: editingRecipe.id, ingredientId: suggestion.id}))
        }
    }

    let index = 0
    return (
        <>
            {editingRecipe && (
                <>
                    <span>Editing recipe {editingRecipe.name}</span>
                    <DoneControl action={editRecipe()}/>
                    <br/>
                    <AddItem
                        placeholder={"+ ingredient"}
                        createFromName={onCreateFromName}
                        suggestionItems={ingredients}
                        createFromSuggestion={onCreateFromSuggestion}
                        createFromNewSuggestion={onCreateFromNewSuggestion}
                    />
                    {editingRecipe.ingredients.map(recipeIngredient => (
                        <div
                            key={index++}
                            className={style.listItem}
                        >
                            <span>
                                {recipeIngredient.ingredientName || (recipeIngredient.ingredientId && findById(ingredients, recipeIngredient.ingredientId)?.name)}
                            </span>
                            <TrashControl action={removeFromRecipe(
                                {id: editingRecipe.id, recipeIngredient: recipeIngredient}
                            )}/>
                        </div>
                    ))}
                </>
            )}
            {!editingRecipe && (
                <div>Recipe</div>
            )}
        </>
    )
}