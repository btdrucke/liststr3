import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import {RootState} from "../../app/store"
import _ from "lodash"
import {IsFavorite, toggleIsFavoriteReducer} from "../../common/IsFavorite"
import {deleteItemReducer, equalsId, findById} from "../../common/IdOwner"
import {NameOwner} from "../../common/NameOwner"
import {createItem as createMeal} from "../meals/slice"

interface RecipeIngredientModel extends BaseItem {
    ingredientId?: string
}

function createRecipeIngredientModel(
    name: string,
    ingredientId?: string,
): RecipeIngredientModel {
    return {
        name: name,
        id: nanoid(),
        ingredientId: ingredientId,
    }
}

interface RecipeModel extends BaseItem, IsFavorite {
    ingredients: RecipeIngredientModel[]
}

function createRecipeModel(
    name: string,
    id: string = nanoid(),
    isFavorite: boolean = false,
    ingredients: RecipeIngredientModel[] = [],
): RecipeModel {
    return {
        name: name,
        id: id,
        isFavorite: isFavorite,
        ingredients: ingredients,
    }
}

const slice = createSlice({
    name: 'ingredients',
    initialState: {
        items: [
            createRecipeModel("Enchiladas"),
            createRecipeModel("Burgers"),
            createRecipeModel("Stir Fry"),
            createRecipeModel("Middle Eastern"),
        ],
        editingItemId: undefined as (string | undefined),
    },
    reducers: {
        createItem: (state, action: PayloadAction<NameOwner>) => {
            const {name} = action.payload
            const item = createRecipeModel(name)
            state.items.push(item)
        },
        editItem: (state, action: PayloadAction<string | undefined>) => {
            state.editingItemId = action.payload
        },
        addRecipeIngredient: (
            state,
            action: PayloadAction<{ id: string, ingredientName: string, ingredientId?: string }>
        ) => {
            const {id, ingredientName, ingredientId} = action.payload
            const item = findById(state.items, id)
            if (item) {
                item.ingredients.push(createRecipeIngredientModel(ingredientName, ingredientId))
            }
        },
        removeRecipeIngredient: (state, action: PayloadAction<{ id: string, recipeIngredientId: string }>) => {
            const {id, recipeIngredientId} = action.payload
            const item = findById(state.items, id)
            if (item) {
                item.ingredients = item.ingredients.filter(it => it.id !== recipeIngredientId)
            }
        },
        renameItem: renameItemReducer,
        toggleIsFavorite: toggleIsFavoriteReducer,
        deleteItem: deleteItemReducer,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMeal, (state, action) => {
                const {name, recipeId} = action.payload
                if (recipeId && !state.items.some(equalsId(recipeId))) {
                    const item = createRecipeModel(name, recipeId)
                    state.items.push(item)
                }
            })
            .addDefaultCase(() => {})
    }
})

const selectItemsInput = (state: RootState) => state.recipes.items

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


export const selectEditingItem = createSelector(
    [
        selectItemsInput,
        (state: RootState) => state.recipes.editingItemId,
    ],
    (items, editingItemId) => editingItemId && findById(items, editingItemId)
)

export const {
    createItem,
    editItem,
    addRecipeIngredient,
    removeRecipeIngredient,
    renameItem,
    toggleIsFavorite,
    deleteItem,
} = slice.actions

export default slice.reducer