import {createSelector, createSlice} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"

export enum AppMode {
    ManageMeals,
    ManageRecipes,
    ManageIngredients,
    ManageShoppingList,
    ManageTags,
}

const slice = createSlice({
    name: 'mode',
    initialState: {
        value: AppMode.ManageShoppingList
    },
    reducers: {
        updateAppMode: (state, action) => {
            state.value = action.payload
        }
    },
})

export const selectAppMode = createSelector(
    [(state: RootState) => state.appMode],
    (appMode) => appMode.value
)

export const {updateAppMode} = slice.actions

export default slice.reducer