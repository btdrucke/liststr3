import {createSelector, createSlice} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"

export enum AppMode {
    ManageMeals,
    ManageRecipes,
    ManageRecipe,
    ManageIngredients,
    ManageShoppingList,
    ManageMarkets,
    Shop
}

const slice = createSlice({
    name: 'mode',
    initialState: {
        value: AppMode.ManageShoppingList
    },
    reducers: {
        updateMode: (state, action) => {
            state.value = action.payload
        }
    }
})

export const selectAppMode = createSelector(
    [(state: RootState) => state.appMode.value],
    (appMode) => appMode
)

export const { updateMode } = slice.actions

export default slice.reducer