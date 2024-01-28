import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"
import _ from "lodash"
import {IsFavorite, toggleIsFavoriteReducer} from "../../common/IsFavorite"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import {findById} from "../../common/IdOwner"
import {NameOwner} from "../../common/NameOwner"
import {createShoppingItemFromNewIngredient} from "../shoppingList/slice"
import {addTagReducer, removeTagReducer, TagsOwner} from "../tags/TagsOwner"
import {addIngredientToRecipe} from "../recipes/slice"
import {deleteItemReducer, selectItemById, selectItemsByIds} from "../../common/IdOwnerRedux"

export interface IngredientModel extends BaseItem, IsFavorite, TagsOwner {
}

function createModel(
    name: string,
    id?: string,
    tagIds?: string[],
    isFavorite?: boolean,
): IngredientModel {
    return {
        name: name,
        id: id || nanoid(),
        isFavorite: isFavorite === true,
        tagIds: tagIds || [],
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
        createIngredient: (state, action: PayloadAction<string>) => {
            const name = action.payload
            const item = createModel(name)
            state.items.push(item)
        },
        addTagToIngredient: addTagReducer,
        removeTagFromIngredient: removeTagReducer,
        renameIngredient: renameItemReducer,
        toggleIngredientIsFavorite: toggleIsFavoriteReducer,
        deleteIngredient: deleteItemReducer,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createShoppingItemFromNewIngredient, (state, action) => {
                const name = action.payload
                const item = createModel(name)
                state.items.push(item)
            })
            .addCase(addIngredientToRecipe, (state, action) => {
                const {ingredientId, ingredientName} = action.payload
                if (ingredientId && ingredientName) {
                    if (!findById(state.items, ingredientId)) {
                        const item = createModel(ingredientName, ingredientId)
                        state.items.push(item)
                    }
                }
            })
            .addDefaultCase(() => {})
    }
})

const selectIngredientsInput = (state: RootState) => state.ingredients.items

export const selectIngredients = createSelector(
    [selectIngredientsInput],
    (items) => _.orderBy(
        items,
        ['isFavorite', 'name'],
        ['desc', 'desc', 'asc']
    )
)

export const selectIngredientById = selectItemById(selectIngredientsInput)

export const selectIngredientsByIds = selectItemsByIds(selectIngredientsInput)

export const {
    createIngredient,
    addTagToIngredient,
    removeTagFromIngredient,
    renameIngredient,
    toggleIngredientIsFavorite,
    deleteIngredient,
} = slice.actions

export default slice.reducer