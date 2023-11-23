import {createSlice} from "@reduxjs/toolkit"

export enum AppMode {
    ManageMeals,
    ManageRecipes,
    ManageRecipe,
    ManageIngredients,
    ManageShoppingList,
    ManageMarkets,
    Shop
}

const appModeSlice = createSlice({
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

export const { updateMode } = appModeSlice.actions

export default appModeSlice.reducer