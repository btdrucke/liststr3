import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import {deleteItemReducer} from "../../common/IdOwner"
import {IsChecked, toggleIsCheckedReducer} from "../../common/IsChecked"
import {addTagReducer, removeTagReducer, TagsOwner} from "../tags/TagsOwner"
import {NameOwner} from "../../common/NameOwner"

export interface ShoppingItemModel extends BaseItem, IsChecked, TagsOwner {
}

function createModel(
    name: string,
    tagIds?: string[],
    id?: string,
): ShoppingItemModel {
    return {
        name: name,
        id: id || nanoid(),
        isChecked: false,
        tagIds: tagIds || [],
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
        createShoppingItem: (state, action: PayloadAction<string>) => {
            const item = createModel(action.payload)
            state.items.push(item)
        },
        createShoppingItemFromNewIngredient: (state, action: PayloadAction<string>) => {
            const item = createModel(action.payload)
            state.items.push(item)
        },
        // Shopping item is a copy of the current state of an ingredient, but then can be independently modified.
        createShoppingItemFromIngredient: (state, action: PayloadAction<NameOwner & TagsOwner>) => {
            const {name, tagIds} = action.payload
            const item = createModel(name, tagIds)
            state.items.push(item)
        },
        addTagToShoppingItem: addTagReducer,
        removeTagFromShoppingItem: removeTagReducer,
        renameShoppingItem: renameItemReducer,
        toggleShoppingItemIsChecked: toggleIsCheckedReducer,
        deleteShoppingItem: deleteItemReducer,
    }
})

const selectShoppingItemsInput = (state: RootState) => state.shoppingList.items

export const selectShoppingItems = createSelector(
    [selectShoppingItemsInput],
    (items) => items.slice().reverse()
)

export const {
    createShoppingItem,
    createShoppingItemFromNewIngredient,
    createShoppingItemFromIngredient,
    addTagToShoppingItem,
    removeTagFromShoppingItem,
    renameShoppingItem,
    toggleShoppingItemIsChecked,
    deleteShoppingItem,
} = slice.actions

export default slice.reducer