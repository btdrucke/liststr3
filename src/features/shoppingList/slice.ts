import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"
import {NamedBaseItem, renameItemReducer} from "../../common/BaseItem"
import {IsChecked, toggleIsCheckedReducer} from "../../common/IsChecked"
import {addTagReducer, removeTagReducer, TagsOwner} from "../tags/TagsOwner"
import {NameOwner} from "../../common/NameOwner"
import {deleteItemReducer} from "../../common/IdOwnerRedux"
import {AboutToAddMealModel} from "../meals/slice"

export interface ShoppingItemModel extends NamedBaseItem, IsChecked, TagsOwner {
    ingredientId?: string,
}

function createModelFromName(name: string): ShoppingItemModel {
    return {
        name: name,
        id: nanoid(),
        isChecked: false,
        tagIds: [],
    }
}

function createModelFromIngredient(ingredient: NameOwner & TagsOwner): ShoppingItemModel {
    return {
        name: ingredient.name,
        tagIds: ingredient.tagIds,
        id: nanoid(),
        isChecked: false,
    }
}

const slice = createSlice({
    name: 'shoppingList',
    initialState: {
        items: [
            createModelFromName("Apples"),
            createModelFromName("Chips"),
        ]
    },
    reducers: {
        createShoppingItem: (state, action: PayloadAction<string>) => {
            const name = action.payload
            const item = createModelFromName(name)
            state.items.push(item)
        },
        createShoppingItemFromNewIngredient: (state, action: PayloadAction<string>) => {
            const name = action.payload
            const item = createModelFromName(name)
            state.items.push(item)
        },
        // Shopping item is a copy of the current state of an ingredient, but then can be independently modified.
        createShoppingItemFromIngredient: (state, action: PayloadAction<NameOwner & TagsOwner>) => {
            const item = createModelFromIngredient(action.payload)
            state.items.push(item)
        },
        createShoppingItemsFromMeal: (state, action: PayloadAction<AboutToAddMealModel>) => {
            console.log("createShoppingItemsFromMeal()")
            action.payload.recipeIngredients.forEach(recipeIngredient => {
                if (recipeIngredient.isChecked) {
                    if (recipeIngredient.ingredient) {
                        state.items.push(createModelFromIngredient(recipeIngredient.ingredient))
                    } else if (recipeIngredient.ingredientName) {
                        state.items.push(createModelFromName(recipeIngredient.ingredientName))
                    }
                }
            })
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
    createShoppingItemsFromMeal,
    addTagToShoppingItem,
    removeTagFromShoppingItem,
    renameShoppingItem,
    toggleShoppingItemIsChecked,
    deleteShoppingItem,
} = slice.actions

export default slice.reducer