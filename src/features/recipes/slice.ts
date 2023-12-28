import {createSelector, createSlice, Draft, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, findById} from "../../common/BaseItem"
import {RootState} from "../../app/store"
import _ from "lodash"
import {deleteItemReducer, renameItemReducer, toggleIsFavoriteReducer} from "../../common/Reducers"
import {IsFavoriteItem} from "../../common/IsFavoriteItem"

export interface RecipeModel extends BaseItem, IsFavoriteItem {
}

function createModel(
    name: string,
    isFavorite: boolean = false,
    id: string = nanoid()
): RecipeModel {
    return {
        id: id, name: name, isFavorite: isFavorite,
    }
}

const slice = createSlice({
    name: 'ingredients',
    initialState: {
        items: [
            createModel("Enchiladas"),
            createModel("Burgers"),
            createModel("Stir Fry"),
            createModel("Middle Eastern"),
        ]
    },
    reducers: {
        createRecipe: (state: Draft<{ items: BaseItem[] }>, action: PayloadAction<string>) => {
            const name = action.payload
            const item = createModel(name)
            state.items.push(item)
        },
        renameRecipe: renameItemReducer,
        toggleIsFavorite: toggleIsFavoriteReducer,
        deleteRecipe: deleteItemReducer,
    }
})

export const selectRecipeItems = createSelector(
    [(state: RootState) => state.recipes.items],
    (items) => _.orderBy(
        items,
        ['isFavorite', 'lastUsedTimestamp', 'name'],
        ['desc', 'desc', 'asc']
    )
)

export const selectRecipe = createSelector(
    [
        (state: RootState) => state.recipes.items,
        (_: RootState, id: string) => id
    ],
    (items, id) => findById(items, id)
)

export const {
    createRecipe,
    renameRecipe,
    toggleIsFavorite,
    deleteRecipe,
} = slice.actions

export default slice.reducer