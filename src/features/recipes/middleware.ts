import {Middleware} from "@reduxjs/toolkit"
import {deleteIngredient, selectIngredientById} from "../ingredients/slice"
import {deleteIngredientFromAllRecipes} from "./slice"

export const recipeMiddleware: Middleware = storeApi => next => action => {
    if (action.type === deleteIngredient.type) {
        const ingredientId = action.payload
        console.log(`Deleting ingredient ${ingredientId}`)
        const ingredient = selectIngredientById(storeApi.getState(), ingredientId)
        if (ingredient) {
            console.log(`Found ingredient ${ingredientId} !`)
            storeApi.dispatch(deleteIngredientFromAllRecipes(ingredient))
        }
    }
    return next(action)
}