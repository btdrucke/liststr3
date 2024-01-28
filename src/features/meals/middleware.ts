import {Middleware} from "@reduxjs/toolkit"
import {selectRecipeById} from "../recipes/slice"
import {AboutToAddRecipeIngredientModel, createMeal, reviewAddShoppingItems} from "./slice"
import {selectIngredientById} from "../ingredients/slice"

export const mealMiddleware: Middleware = storeApi => next => action => {
    let result = next(action)
    if (action.type === createMeal.type) {
        const state = storeApi.getState()
        const recipe = selectRecipeById(state, action.payload.recipeId)
        if (recipe && recipe.recipeIngredients.length > 0) {
            const recipeIngredients: AboutToAddRecipeIngredientModel[] = recipe.recipeIngredients.map(it => {
                return {
                    id: it.id,
                    isChecked: false,
                    ingredientName: it.ingredientName,
                    ingredient: selectIngredientById(state, it.ingredientId)
                }
            })
            storeApi.dispatch(
                reviewAddShoppingItems({
                    name: action.payload.name,
                    recipeIngredients: recipeIngredients,
                })
            )
        }
    }
    return result
}