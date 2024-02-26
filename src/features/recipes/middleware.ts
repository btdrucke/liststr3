import {EntityId, Middleware, nanoid} from "@reduxjs/toolkit"
import {createIngredient, deleteIngredient, selectIngredientById} from "../ingredients/slice"
import {
    addIngredientToRecipeFromId,
    addNewIngredientToRecipe,
    createRecipe,
    deleteIngredientFromAllRecipes
} from "./slice"
import {createMealFromNewRecipe, createMealFromRecipeId} from "../meals/slice"

const recipeMiddleware: Middleware = storeApi => next => action => {
    if (createMealFromNewRecipe.match(action)) {
        const {datestamp, recipeName} = action.payload
        const newRecipeId = nanoid()
        // Create new recipe first.
        storeApi.dispatch(createRecipe({name: recipeName, newId: newRecipeId}))
        // Next action will be createMealFromRecipeId instead of createMealFromNewRecipe.
        return next(createMealFromRecipeId({datestamp: datestamp, recipeId: newRecipeId}))
    }

    if (addNewIngredientToRecipe.match(action)) {
        const {id, ingredientName} = action.payload
        const ingredientId: EntityId = nanoid()
        // Create new ingredient first.
        storeApi.dispatch(createIngredient({name: ingredientName, newId: ingredientId}))
        // Next action will be addIngredientToRecipeFromId instead of addNewIngredientToRecipe.
        return next(addIngredientToRecipeFromId({id: id, ingredientId: ingredientId}))
    }

    if (deleteIngredient.match(action)) {
        const ingredientId = action.payload
        const ingredient = selectIngredientById(storeApi.getState(), ingredientId)
        if (ingredient) {
            storeApi.dispatch(deleteIngredientFromAllRecipes(ingredient))
        }
    }

    return next(action)
}

export default recipeMiddleware