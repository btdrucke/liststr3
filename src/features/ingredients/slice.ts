import {createSelector, createSlice, Draft, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, equalsId, findById, findIndexById} from "../../common/BaseItem"
import {RootState} from "../../app/store"
import _ from "lodash"
import {deleteItemReducer, renameItemReducer, toggleIsFavoriteReducer} from "../../common/Reducers"
import {IsFavoriteItem} from "../../common/IsFavoriteItem"

export interface IngredientModel extends BaseItem, IsFavoriteItem {
    readonly lastUsedTimestamp: number;
    readonly usualMarketIds: string[]
}

function createIngredientModel(
    name: string,
    isFavorite: boolean = false,
    lastUsedTimestamp: number = Date.now(),
    usualMarketIds: string[] = [],
    id: string = nanoid()
): IngredientModel {
    return {
        id: id, name: name, isFavorite: isFavorite,
        lastUsedTimestamp: lastUsedTimestamp,
        usualMarketIds: usualMarketIds
    }
}

const slice = createSlice({
    name: 'ingredients',
    initialState: {
        items: [
            createIngredientModel("Extra firm tofu"),
            createIngredientModel("English cucumber"),
            createIngredientModel("Silk protein milk"),
            createIngredientModel("Red onions"),
        ]
    },
    reducers: {
        createIngredient: (state: Draft<{ items: BaseItem[] }>, action: PayloadAction<string>) => {
            const name = action.payload
            const item = createIngredientModel(name)
            state.items.push(item)
        },
        renameIngredient: renameItemReducer,
        toggleIsFavorite: toggleIsFavoriteReducer,
        deleteIngredient: deleteItemReducer,
    }
})

export const selectIngredientItems = createSelector(
    [(state: RootState) => state.ingredients.items],
    (items) => _.orderBy(
        items,
        ['isFavorite', 'lastUsedTimestamp', 'name'],
        ['desc', 'desc', 'asc']
    )
)

export const selectIngredient = createSelector(
    [
        (state: RootState) => state.ingredients.items,
        (_: RootState, id: string) => id
    ],
    (items, id) => findById(items, id)
)

export const {
    createIngredient,
    renameIngredient,
    toggleIsFavorite,
    deleteIngredient,
} = slice.actions

export default slice.reducer