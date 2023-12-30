import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import {deleteItemReducer, findById} from "../../common/IdOwner"
import {IsChecked, toggleIsCheckedReducer} from "../../common/IsChecked"

export interface ShoppingItemModel extends BaseItem, IsChecked {
    readonly ingredientId?: string
}

function createModel(
    name: string,
    ingredientId?: string,
    id?: string,
): ShoppingItemModel {
    return {
        name: name,
        id: id || nanoid(),
        isChecked: false,
        ingredientId: ingredientId,
    }
}

const slice = createSlice({
    name: 'shoppingList',
    initialState: {
        items: [
            createModel("Apples"),
            createModel("Chips"),
        ]
    },
    reducers: {
        createItem: (state, action: PayloadAction<{ name: string, ingredientId?: string }>) => {
            const {name, ingredientId} = action.payload
            const item = createModel(name, ingredientId)
            state.items.push(item)
        },
        renameItem: renameItemReducer,
        toggleIsChecked: toggleIsCheckedReducer,
        deleteItem: deleteItemReducer,
    }
})

const selectItemsInput = (state: RootState) => state.shoppingList.items

export const selectItems = createSelector(
    [selectItemsInput],
    (items) => items.slice().reverse()
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
    toggleIsChecked,
    deleteItem,
} = slice.actions

export default slice.reducer