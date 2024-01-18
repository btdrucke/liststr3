import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import {RootState} from "../../app/store"
import _ from "lodash"
import {IsFavorite, toggleIsFavoriteReducer} from "../../common/IsFavorite"
import {deleteItemReducer, equalsId, findById, IdOwner} from "../../common/IdOwner"
import {createMeal} from "../meals/slice"

export interface RecipeIngredientModel extends IdOwner {
    ingredientName?: string,
    ingredientId?: string,
}

export interface RecipeModel extends BaseItem, IsFavorite {
    ingredients: RecipeIngredientModel[]
}

function createRecipeModel(name: string, id?: string): RecipeModel {
    return {
        name: name,
        id: id || nanoid(),
        isFavorite: false,
        ingredients: [],
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
        createRecipe: (state, action: PayloadAction<string>) => {
            const name = action.payload
            const item = createRecipeModel(name)
            state.items.push(item)
        },
        editRecipe: (state, action: PayloadAction<string | undefined>) => {
            state.editingItemId = action.payload
        },
        addIngredientToRecipe: (state, action: PayloadAction<IdOwner & RecipeIngredientModel>) => {
            const {id, ingredientName, ingredientId} = action.payload
            console.log(`addIngredientToRecipe: name=${ingredientName}, id=${ingredientId}`)
            if (ingredientName || ingredientId) {
                const item = findById(state.items, id)
                console.log(`addIngredientToRecipe: recipe=${item?.name}, id=${item?.id}`)
                if (item) {
                    item.ingredients.push({id: nanoid(), ingredientId: ingredientId, ingredientName: ingredientName})
                    console.log(`addIngredientToRecipe: pushed`)
                }
            }
        },
        removeFromRecipe: (state, action: PayloadAction<IdOwner & { recipeIngredientId: string }>) => {
            const {id, recipeIngredientId} = action.payload
            const item = findById(state.items, id)
            if (item) {
                _.remove(item.ingredients, equalsId(recipeIngredientId))
            }
        },
        renameRecipe: renameItemReducer,
        toggleRecipeIsFavorite: toggleIsFavoriteReducer,
        deleteRecipe: deleteItemReducer,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMeal, (state, action) => {
                const {name, recipeId} = action.payload
                if (recipeId) {
                    const item = findById(state.items, recipeId)
                    if (!item) {
                        const item = createRecipeModel(name, recipeId)
                        state.items.push(item)
                    }
                }
            })
            .addDefaultCase(() => {})
    }
})

const selectRecipesInput = (state: RootState) => state.recipes.items

export const selectRecipes = createSelector(
    [selectRecipesInput],
    (items) => _.orderBy(
        items,
        ['isFavorite', 'name'],
        ['desc', 'desc', 'asc']
    )
)

export const selectRecipe = createSelector(
    [
        selectRecipesInput,
        (_: RootState, id?: string) => id
    ],
    (items, id) => (id && findById(items, id)) || undefined
)

export const selectEditingRecipe = createSelector(
    [
        selectRecipesInput,
        (state: RootState) => state.recipes.editingItemId,
    ],
    (items, id) => (id && findById(items, id)) || undefined
)

export const {
    createRecipe,
    editRecipe,
    addIngredientToRecipe,
    removeFromRecipe,
    renameRecipe,
    toggleRecipeIsFavorite,
    deleteRecipe,
} = slice.actions

export default slice.reducer