import {createSelector, createSlice} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"
import {editItem as editRecipe} from "../recipes/slice"

export enum AppMode {
    ManageMeals,
    ManageRecipes,
    ManageRecipe,
    ManageIngredients,
    ManageShoppingList,
    ManageMarkets,
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
    },
    extraReducers: builder => {
        builder
            .addCase(editRecipe, (state, action) => {
                const editingRecipeId = action.payload
                state.value = editingRecipeId ? AppMode.ManageRecipe : AppMode.ManageRecipes
            })
            .addDefaultCase(() => {})
    }
})

export const selectAppMode = createSelector(
    [(state: RootState) => state.appMode.value],
    (appMode) => appMode
)

export const {updateMode} = slice.actions

export default slice.reducer