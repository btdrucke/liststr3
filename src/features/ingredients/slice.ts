import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"
import _ from "lodash"
import {IsFavorite, toggleIsFavoriteReducer} from "../../common/IsFavorite"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import {deleteItemReducer, equalsId, findById} from "../../common/IdOwner"
import {NameOwner} from "../../common/NameOwner"
import {createItem as createShoppingItem} from "../shoppingList/slice"
import {addRecipeIngredient} from "../recipes/slice"

interface IngredientModel extends BaseItem, IsFavorite {
    readonly lastUsedTimestamp: number;
    readonly usualMarketIds: string[]
}

function createModel(
    name: string,
    id: string = nanoid(),
    isFavorite: boolean = false,
    lastUsedTimestamp: number = Date.now(),
    usualMarketIds: string[] = [],
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(createShoppingItem, (state, action) => {
                const {name, ingredientId} = action.payload
                if (ingredientId && !state.items.some(equalsId(ingredientId))) {
                    const item = createModel(name, ingredientId)
                    state.items.push(item)
                }
            })
            .addCase(addRecipeIngredient, (state, action) => {
                const {ingredientName, ingredientId} = action.payload
                if (ingredientId && !state.items.some(equalsId(ingredientId))) {
                    const item = createModel(ingredientName, ingredientId)
                    state.items.push(item)
                }
            })
            .addDefaultCase(() => {})
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