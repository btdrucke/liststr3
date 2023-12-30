import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"
import _ from "lodash"
import {IsFavorite, toggleIsFavoriteReducer} from "../../common/IsFavorite"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import {deleteItemReducer, findById} from "../../common/IdOwner"
import {NameOwner} from "../../common/NameOwner"

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
        createItem: (state, action: PayloadAction<NameOwner>) => {
            const {name} = action.payload
            const item = createModel(name)
            state.items.push(item)
        },
        renameItem: renameItemReducer,
        toggleIsFavorite: toggleIsFavoriteReducer,
        deleteItem: deleteItemReducer,
    }
})

const selectItemsInput = (state: RootState) => state.ingredients.items

export const selectItems = createSelector(
    [selectItemsInput],
    (items) => _.orderBy(
        items,
        ['isFavorite', 'lastUsedTimestamp', 'name'],
        ['desc', 'desc', 'asc']
    )
)

export const selectItem = createSelector(
    [
        selectItemsInput,
        (_: RootState, id: string) => id
    ],
    (items, id) => findById(items, id)
)

export const {
    createItem,
    renameItem,
    toggleIsFavorite,
    deleteItem,
} = slice.actions

export default slice.reducer