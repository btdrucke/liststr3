import {createSelector, createSlice, EntityId, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import {IsChecked, toggleIsCheckedReducer} from "../../common/IsChecked"
import {addTagReducer, removeTagReducer} from "../tags/TagsOwner"
import {NameOwner} from "../../common/NameOwner"
import {deleteItemReducer} from "../../common/IdOwnerRedux"
import {AboutToAddMealModel} from "../meals/slice"
import {IngredientModel} from "../ingredients/slice"

export interface ShoppingItemModel extends BaseItem, IsChecked {
    tagIds?: EntityId[],
    ingredientId?: EntityId,
}

function createModelFromName(name: string): ShoppingItemModel {
    return {
        name: name,
        id: nanoid(),
        isChecked: false,
    }
}

function createModelFromIngredientId(ingredientId: EntityId): ShoppingItemModel {
    return {
        ingredientId: ingredientId,
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
        createShoppingItem: (state, action: PayloadAction<NameOwner>) => {
            const {name} = action.payload
            const item = createModelFromName(name)
            state.items.push(item)
        },
        // Shopping item is a copy of the current state of an ingredient, but then can be independently modified.
        createShoppingItemFromIngredientId: (state, action: PayloadAction<{ ingredientId: EntityId }>) => {
            const {ingredientId} = action.payload
            const item = createModelFromIngredientId(ingredientId)
            state.items.push(item)
        },
        createShoppingItemFromNewIngredient: (state, action: PayloadAction<{ ingredientName: string }>) => {
            // Depends on middleware to create ingredient and dispatch createShoppingItemFromIngredient.
        },
        createShoppingItemsFromMeal: (state, action: PayloadAction<AboutToAddMealModel>) => {
            console.log("createShoppingItemsFromMeal()")
            action.payload.recipeIngredients.forEach(recipeIngredient => {
                if (recipeIngredient.isChecked) {
                    if (recipeIngredient.ingredient) {
                        state.items.push(createModelFromIngredientId(recipeIngredient.ingredient.id))
                    } else if (recipeIngredient.ingredientName) {
                        state.items.push(createModelFromName(recipeIngredient.ingredientName))
                    }
                }
            })
        },
        deleteIngredientFromAllShoppingItems: (state, action: PayloadAction<IngredientModel>) => {
            const ingredient = action.payload
            state.items.forEach(shoppingItem => {
                if (shoppingItem.ingredientId === ingredient.id) {
                    shoppingItem.name = ingredient.name
                    shoppingItem.tagIds = ingredient.tagIds
                    shoppingItem.ingredientId = undefined
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
    createShoppingItemFromIngredientId,
    createShoppingItemFromNewIngredient,
    createShoppingItemsFromMeal,
    deleteIngredientFromAllShoppingItems,
    addTagToShoppingItem,
    removeTagFromShoppingItem,
    renameShoppingItem,
    toggleShoppingItemIsChecked,
    deleteShoppingItem,
} = slice.actions

export default slice.reducer