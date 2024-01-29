import {combineReducers, configureStore} from '@reduxjs/toolkit'
import appModeReducer from '../features/appMode/slice'
import ingredientsReducer from '../features/ingredients/slice'
import tagsReducer from '../features/tags/slice'
import mealsReducer from '../features/meals/slice'
import recipeReducer from '../features/recipes/slice'
import shoppingListReducer from '../features/shoppingList/slice'
import logger from 'redux-logger'
import shoppingListMiddleware from "../features/shoppingList/middleware"
import mealMiddleware from "../features/meals/middleware"
import recipeMiddleware from "../features/recipes/middleware"
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const rootReducer = combineReducers({
    appMode: appModeReducer,
    ingredients: ingredientsReducer,
    tags: tagsReducer,
    meals: mealsReducer,
    recipes: recipeReducer,
    shoppingList: shoppingListReducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(logger)
        .concat(shoppingListMiddleware)
        .concat(mealMiddleware)
        .concat(recipeMiddleware)
})

export default store

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
