import {Middleware} from "@reduxjs/toolkit"
import {createShoppingItemsFromMeal} from "./slice"
import {confirmAddShoppingItems} from "../meals/slice"

export const shoppingListMiddleware: Middleware = storeApi => next => action => {
    let result = next(action)
    if (action.type === confirmAddShoppingItems.type) {
        const {ingredientNames, ingredients} = action.payload
        storeApi.dispatch(
            createShoppingItemsFromMeal({ingredientNames: ingredientNames, ingredients: ingredients})
        )
    }
    return result
}