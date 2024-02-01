import {addIngredientToRecipe, editRecipe, RecipeModel, removeFromRecipe} from "./slice"
import {IngredientModel, selectIngredients} from "../ingredients/slice"
import React from "react"
import AddItem from "../../common/AddItem"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {DoneControl, TrashControl} from "../../common/IconControls"
import style from "./style.module.css"
import {nanoid} from "@reduxjs/toolkit"
import {findById} from "../../common/IdOwner"
import {Dialog} from "../../common/Dialog"

interface Props {
    recipe: RecipeModel
}

export const Recipe = ({recipe}: Props) => {
    const dispatch = useAppDispatch()
    const ingredients = useAppSelector(selectIngredients)

    const onCreateFromName = (name: string) => {
        dispatch(addIngredientToRecipe({id: recipe.id, ingredientName: name}))
    }

    const onCreateFromNewSuggestion = (name: string) => {
        dispatch(addIngredientToRecipe({id: recipe.id, ingredientName: name, ingredientId: nanoid()}))
    }

    const onCreateFromSuggestion = (suggestion: IngredientModel) => {
        dispatch(addIngredientToRecipe({id: recipe.id, ingredientId: suggestion.id}))
    }

    let index = 0
    return (
        <Dialog>
            <div className={style.title}>
                <div>Editing recipe {recipe.name}</div>
                <DoneControl action={editRecipe()}/>
            </div>
            <AddItem
                placeholder={"+ ingredient"}
                createFromName={onCreateFromName}
                suggestionItems={ingredients}
                createFromSuggestion={onCreateFromSuggestion}
                createFromNewSuggestion={onCreateFromNewSuggestion}
            />
            <div className={style.list}>
                {recipe.recipeIngredients.map(recipeIngredient => (
                    <div
                        key={index++}
                        className={style.listItem}
                    >
                        <div>
                            {recipeIngredient.ingredientName || (recipeIngredient.ingredientId && findById(ingredients, recipeIngredient.ingredientId)?.name)}
                        </div>
                        <TrashControl
                            action={removeFromRecipe({id: recipe.id, recipeIngredientId: recipeIngredient.id})}
                        />
                    </div>
                ))}
            </div>
        </Dialog>
    )
}