import {createSelector, createSlice, EntityId, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {NamedBaseItem, renameItemReducer} from "../../common/BaseItem"
import {RootState} from "../../app/store"
import _ from "lodash"
import {IsFavorite, toggleIsFavoriteReducer} from "../../common/IsFavorite"
import {equalsId, findById, IdOwner} from "../../common/IdOwner"
import {deleteItemReducer, selectItemById} from "../../common/IdOwnerRedux"
import {IngredientModel} from "../ingredients/slice"
import {NameOwner} from "../../common/NameOwner"

export interface RecipeIngredientModel extends IdOwner {
    ingredientName?: string,
    ingredientId?: EntityId,
}

function createRecipeIngredientModel(ingredientName?: string, ingredientId?: EntityId): RecipeIngredientModel {
    return {
        ingredientName: ingredientName,
        ingredientId: ingredientId,
        id: nanoid(),
    }
}

export interface RecipeModel extends NamedBaseItem, IsFavorite {
    recipeIngredients: RecipeIngredientModel[]
}

function createRecipeModel(name: string, id?: EntityId): RecipeModel {
    return {
        name: name,
        id: id || nanoid(),
        isFavorite: false,
        recipeIngredients: [],
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
        editingItemId: undefined as (EntityId | undefined),
    },
    reducers: {
        createRecipe: (state, action: PayloadAction<NameOwner & { newId?: EntityId }>) => {
            const {name, newId} = action.payload
            const item = createRecipeModel(name, newId)
            state.items.push(item)
        },
        editRecipe: (state, action: PayloadAction<EntityId | undefined>) => {
            state.editingItemId = action.payload
        },
        addIngredientToRecipeFromName: (state, action: PayloadAction<IdOwner & { ingredientName: string }>) => {
            const {id, ingredientName} = action.payload
            const item = findById(state.items, id)
            if (item) {
                item.recipeIngredients.push(createRecipeIngredientModel(ingredientName, undefined))
            }
        },
        addIngredientToRecipeFromId: (state, action: PayloadAction<IdOwner & { ingredientId: EntityId }>) => {
            const {id, ingredientId} = action.payload
            const item = findById(state.items, id)
            if (item) {
                item.recipeIngredients.push(createRecipeIngredientModel(undefined, ingredientId))
            }
        },
        addNewIngredientToRecipe: (state, action: PayloadAction<IdOwner & { ingredientName: string }>) => {
            // Depends on middleware to create ingredient and dispatch addIngredientToRecipeFromId.
        },
        removeFromRecipe: (state, action: PayloadAction<IdOwner & { recipeIngredientId: EntityId }>) => {
            const {id, recipeIngredientId} = action.payload
            const item = findById(state.items, id)
            if (item) {
                _.remove(item.recipeIngredients, equalsId(recipeIngredientId))
            }
        },
        deleteIngredientFromAllRecipes: (state, action: PayloadAction<IngredientModel>) => {
            const ingredient = action.payload
            state.items.forEach(recipe => {
                recipe.recipeIngredients.forEach(recipeIngredient => {
                    if (recipeIngredient.ingredientId === ingredient.id) {
                        recipeIngredient.ingredientName = ingredient.name
                        recipeIngredient.ingredientId = undefined
                    }
                })
            })
        },
        renameRecipe: renameItemReducer,
        toggleRecipeIsFavorite: toggleIsFavoriteReducer,
        deleteRecipe: deleteItemReducer,
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

export const selectRecipeById = selectItemById(selectRecipesInput)

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
    addIngredientToRecipeFromName,
    addIngredientToRecipeFromId,
    addNewIngredientToRecipe,
    removeFromRecipe,
    deleteIngredientFromAllRecipes,
    renameRecipe,
    toggleRecipeIsFavorite,
    deleteRecipe,
} = slice.actions

export default slice.reducer