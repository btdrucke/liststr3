import {EntityId, Middleware, nanoid} from "@reduxjs/toolkit"
import {
    createShoppingItemFromIngredientId,
    createShoppingItemFromNewIngredient,
    createShoppingItemsFromMeal,
    deleteIngredientFromAllShoppingItems
} from "./slice"
import {confirmAddShoppingItems, selectAboutToAddMeal} from "../meals/slice"
import {createIngredient, deleteIngredient, selectIngredientById} from "../ingredients/slice"

const shoppingListMiddleware: Middleware = storeApi => next => action => {
    if (createShoppingItemFromNewIngredient.match(action)) {
        const {ingredientName} = action.payload
        const ingredientId: EntityId = nanoid()
        // Create new ingredient first.
        storeApi.dispatch(createIngredient({name: ingredientName, newId: ingredientId}))
        // Next action is createShoppingItemFromIngredientId instead of createShoppingItemFromNewIngredient.
        return next(createShoppingItemFromIngredientId({ingredientId: ingredientId}))
    }

    if (deleteIngredient.match(action)) {
        const ingredientId = action.payload
        const ingredient = selectIngredientById(storeApi.getState(), ingredientId)
        if (ingredient) {
            storeApi.dispatch(deleteIngredientFromAllShoppingItems(ingredient))
        }
    } else if (confirmAddShoppingItems.match(action)) {
        const meal = selectAboutToAddMeal(storeApi.getState())
        if (meal) {
            storeApi.dispatch(createShoppingItemsFromMeal(meal))
        }
    }

    return next(action)
}

export default shoppingListMiddleware