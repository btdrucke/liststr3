import {addRecipeIngredient, editItem, removeRecipeIngredient, selectEditingItem} from "../recipes/slice"
import {selectItems as selectIngredients} from "../ingredients/slice"
import React from "react"
import AddItem from "../../common/AddItem"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {BaseItem} from "../../common/BaseItem"
import {DoneControl, TrashControl} from "../../common/IconControls"

export const Recipe = () => {
    const dispatch = useAppDispatch()
    const ingredients = useAppSelector(selectIngredients)
    const editingRecipe = useAppSelector(selectEditingItem)

    const onCreateFromName = (name: string) => {
        if (editingRecipe) {
            dispatch(addRecipeIngredient({id: editingRecipe.id, ingredientName: name}))
        }
    }

    const onCreateFromSuggestion = (suggestion: BaseItem) => {
        if (editingRecipe) {
            dispatch(
                addRecipeIngredient(
                    {id: editingRecipe.id, ingredientName: suggestion.name, ingredientId: suggestion.id}
                )
            )
        }
    }

    return (
        <>
            {editingRecipe && (
                <>
                    <span>Editing recipe {editingRecipe.name}</span>
                    <DoneControl action={editItem()}/>
                    <br/>
                    <AddItem
                        placeholder={"+ ingredient"}
                        createFromName={onCreateFromName}
                        suggestionItems={ingredients}
                        createFromSuggestion={onCreateFromSuggestion}
                    />
                    {editingRecipe.ingredients.map(recipeIngredient => (
                        <div key={recipeIngredient.id}>
                            <span>
                                {recipeIngredient.name}
                            </span>
                            <TrashControl action={removeRecipeIngredient({
                                id: editingRecipe.id,
                                recipeIngredientId: recipeIngredient.id
                            })}/>
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