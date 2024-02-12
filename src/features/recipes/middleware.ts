import {Middleware, nanoid} from "@reduxjs/toolkit"
import {deleteIngredient, selectIngredientById} from "../ingredients/slice"
import {createRecipe, deleteIngredientFromAllRecipes} from "./slice"
import {createMealFromRecipe} from "../meals/slice"

const recipeMiddleware: Middleware = storeApi => next => action => {
    let updatedAction = undefined

    if (action.type === deleteIngredient.type && deleteIngredient.match(action)) {
        const ingredientId = action.payload
        console.log(`Deleting ingredient ${ingredientId}`)
        const ingredient = selectIngredientById(storeApi.getState(), ingredientId)
        if (ingredient) {
            console.log(`Found ingredient ${ingredientId} !`)
            storeApi.dispatch(deleteIngredientFromAllRecipes(ingredient))
        }
    } else if (action.type === createMealFromRecipe.type && createMealFromRecipe.match(action)) {
        const {recipeName, recipeId} = action.payload
        // If there's no recipe ID, then we need to create a new recipe.
        if (!recipeId) {
            if (!recipeName) {
                console.error("Can't create new recipe without a name")
            } else {
                const newRecipeId = nanoid()
                storeApi.dispatch(createRecipe({name: recipeName, newId: newRecipeId}))
                // Update createMealFromRecipe action payload with the newly created recipe ID.
                updatedAction = {...action, payload: {...action.payload, recipeId: newRecipeId}}
            }
        }
    }

    return next(updatedAction || action)
}

export default recipeMiddleware