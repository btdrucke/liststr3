import {Middleware} from "@reduxjs/toolkit"
import {selectRecipeById} from "../recipes/slice"
import {createMeal, reviewAddShoppingItems} from "./slice"
import {selectIngredientsByIds} from "../ingredients/slice"

export const mealMiddleware: Middleware = storeApi => next => action => {
    let result = next(action)
    if (action.type === createMeal.type) {
        const recipe = selectRecipeById(storeApi.getState(), action.payload.recipeId)
        if (recipe) {
            const ingredientNames = recipe.ingredients.flatMap(it =>
                (it.ingredientName !== undefined && it.ingredientId === undefined) ? [{name: it.ingredientName}] : []
            )
            const ingredientIds = recipe.ingredients.flatMap(it => (it.ingredientId !== undefined) ? [it.ingredientId] : [])
            const ingredients = selectIngredientsByIds(storeApi.getState(), ingredientIds)
            if (ingredientNames.length || ingredients.length) {
                storeApi.dispatch(
                    reviewAddShoppingItems({
                        name: action.payload.name,
                        ingredientNames: ingredientNames,
                        ingredients: ingredients
                    })
                )
            }
        }
    }
    return result
}