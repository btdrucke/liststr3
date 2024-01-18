import {configureStore} from '@reduxjs/toolkit'
import appModeReducer from '../features/appMode/slice'
import ingredientsReducer from '../features/ingredients/slice'
import tagsReducer from '../features/tags/slice'
import mealsReducer from '../features/meals/slice'
import recipeReducer from '../features/recipes/slice'
import shoppingListReducer from '../features/shoppingList/slice'
import logger from 'redux-logger'
import {shoppingListMiddleware} from "../features/shoppingList/middleware"
import {mealMiddleware} from "../features/meals/middleware"

const store = configureStore({
    reducer: {
        appMode: appModeReducer,
        ingredients: ingredientsReducer,
        tags: tagsReducer,
        meals: mealsReducer,
        recipes: recipeReducer,
        shoppingList: shoppingListReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(logger)
        .concat(shoppingListMiddleware)
        .concat(mealMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store