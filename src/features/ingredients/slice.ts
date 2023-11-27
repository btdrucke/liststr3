import {createSelector, createSlice, nanoid} from "@reduxjs/toolkit"
import {BaseItem, findById, findIndexById} from "../../common/BaseItem"
import {RootState} from "../../app/store"

export interface IngredientModel extends BaseItem {
    readonly isFavorite: boolean;
    // readonly lastUsed: Date;
    readonly usualMarketIds: string[]
}

function createIngredientModel(
    name: string,
    isFavorite: boolean = false,
    // lastUsed: Date = new Date(),
    usualMarketIds: string[] = [],
    id: string = nanoid()
): IngredientModel {
    return {
        id: id, name: name, isFavorite: isFavorite,
        // lastUsed: lastUsed,
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
        createIngredient: (state, action) => {
            const name: string = action.payload
            const item = createIngredientModel(name)
            state.items.push(item)
        },
        renameIngredient: (state, action) => {
            const item: BaseItem = action.payload
            const pos = findIndexById(state.items, item.id)
            if (pos >= 0) {
                state.items[pos].name = item.name
            }
        },
        toggleIsFavorite:  (state, action) => {
            const id: string = action.payload
            const pos = findIndexById(state.items, id)
            if (pos >= 0) {
                state.items[pos].isFavorite = !state.items[pos].isFavorite
            }
        },
        deleteIngredient: (state, action) => {
            const id: string = action.payload
            const pos = findIndexById(state.items, id)
            if (pos >= 0) {
                state.items.splice(pos, 1)
            }
        },
    }
})

export const selectIngredientItems = createSelector(
    [(state: RootState) => state.ingredients.items],
    (items) => items
)

export const selectIngredient  = createSelector(
    [
        (state: RootState) => state.ingredients.items,
        (_: RootState, id: string) => id
    ],
    (items, id) => items.find(it => it.id === id)
)

export const {
    createIngredient,
    renameIngredient,
    toggleIsFavorite,
    deleteIngredient,
} = slice.actions

export default slice.reducer