import {Middleware} from "@reduxjs/toolkit"
import {selectRecipeById} from "../recipes/slice"
import {AboutToAddRecipeIngredientModel, createMealFromRecipeId, reviewAddShoppingItems} from "./slice"
import {selectIngredientById} from "../ingredients/slice"

const mealMiddleware: Middleware = storeApi => next => action => {
    let result = next(action)
    if (createMealFromRecipeId.match(action)) {
        const state = storeApi.getState()
        const recipe = selectRecipeById(state, action.payload.recipeId)
        if (recipe && recipe.recipeIngredients.length > 0) {
            const recipeIngredients: AboutToAddRecipeIngredientModel[] = recipe.recipeIngredients.map(it => {
                return {
                    id: it.id,
                    isChecked: true,
                    ingredientName: it.ingredientName,
                    ingredient: selectIngredientById(state, it.ingredientId)
                }
            })
            storeApi.dispatch(
                reviewAddShoppingItems({
                    name: recipe.name,
                    recipeIngredients: recipeIngredients,
                })
            )
        }
    }
    return result
}

export default mealMiddleware