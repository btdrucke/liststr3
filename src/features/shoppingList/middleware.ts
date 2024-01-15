import {Middleware} from "@reduxjs/toolkit"
import {createShoppingItemsFromMeal} from "./slice"
import {selectRecipe} from "../recipes/slice"
import {createMeal} from "../meals/slice"
import {selectIngredientsByIds} from "../ingredients/slice"

export const shoppingListMiddleware: Middleware = storeApi => next => action => {
    let result = next(action)
    if (action.type === createMeal.type) {
        const recipe = selectRecipe(storeApi.getState(), action.payload.recipeId)
        if (recipe) {
            const ingredientNames = recipe.ingredients.flatMap(it => (it.ingredientName !== undefined && it.ingredientId === undefined) ? [it.ingredientName] : [])
            const ingredientIds = recipe.ingredients.flatMap(it => (it.ingredientId !== undefined) ? [it.ingredientId] : [])
            const ingredients = selectIngredientsByIds(storeApi.getState(), ingredientIds)
            storeApi.dispatch(
                createShoppingItemsFromMeal({ingredientNames: ingredientNames, ingredients: ingredients})
            )
        }
    }
    // console.log('next state', storeAPI.getState())
    return result
}