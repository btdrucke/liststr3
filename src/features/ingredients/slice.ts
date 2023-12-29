import {createSelector, createSlice, Draft, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"
import _ from "lodash"
import {IsFavorite, toggleIsFavoriteReducer} from "../../common/IsFavorite"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import {deleteItemReducer, findById} from "../../common/IdOwner"

export interface IngredientModel extends BaseItem, IsFavorite {
    readonly lastUsedTimestamp: number;
    readonly usualMarketIds: string[]
}

function createModel(
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
            createModel("Extra firm tofu"),
            createModel("English cucumber"),
            createModel("Silk protein milk"),
            createModel("Red onions"),
        ]
    },
    reducers: {
        createIngredient: (state: Draft<{ items: BaseItem[] }>, action: PayloadAction<string>) => {
            const name = action.payload
            const item = createModel(name)
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