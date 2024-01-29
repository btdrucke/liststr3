import {Middleware} from "@reduxjs/toolkit"
import {createShoppingItemsFromMeal} from "./slice"
import {confirmAddShoppingItems, selectAboutToAddMeal} from "../meals/slice"

const shoppingListMiddleware: Middleware = storeApi => next => action => {
    if (action.type === confirmAddShoppingItems.type) {
        console.log("Confirmed add shopping items")
        const meal = selectAboutToAddMeal(storeApi.getState())
        console.log(`Found meal: ${JSON.stringify(meal)}`)
        if (meal) {
            storeApi.dispatch(createShoppingItemsFromMeal(meal))
        }
    }
    return next(action)
}

export default shoppingListMiddleware