import {RecipeIngredientModel, removeFromRecipe} from "./slice"
import {selectIngredientById} from "../ingredients/slice"
import React from "react"
import {useAppSelector} from "../../app/hooks"
import {TrashControl} from "../../common/IconControls"
import style from "./style.module.css"
import {classes} from "../../common/classUtils"
import {EntityId} from "@reduxjs/toolkit"

interface Props {
    recipeId: EntityId
    recipeIngredient: RecipeIngredientModel
}

export const RecipeIngredient = ({recipeId, recipeIngredient}: Props) => {
    const ingredient = useAppSelector(state => selectIngredientById(state, recipeIngredient.ingredientId))

    const isReference = recipeIngredient.ingredientName === undefined
    const nameToDisplay = recipeIngredient.ingredientName || ingredient?.name

    return (
        <div className={style.listItem}>
            <div className={classes(isReference && style.reference)}>
                {nameToDisplay}
            </div>
            <TrashControl
                action={removeFromRecipe({id: recipeId, recipeIngredientId: recipeIngredient.id})}
            />
        </div>
    )
}