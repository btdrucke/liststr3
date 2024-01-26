import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import {RootState} from "../../app/store"
import _ from "lodash"
import {equalsId, IdOwner} from "../../common/IdOwner"
import {IsChecked, toggleIsCheckedReducer} from "../../common/IsChecked"
import {NameOwner} from "../../common/NameOwner"
import {IngredientModel} from "../ingredients/slice"
import {deleteItemReducer} from "../../common/IdOwnerRedux"

export interface MealModel extends BaseItem, IsChecked {
    readonly datestamp: string, //YYYY-MM-DD
    readonly recipeId?: string,
}

export interface AboutToAddMealModel extends NameOwner {
    ingredientNames: (IsChecked & NameOwner)[],
    ingredients: (IsChecked & IngredientModel)[],
}

function createModel(name: string, datestamp: string, recipe?: string): MealModel {
    return {
        name: name,
        datestamp: datestamp,
        recipeId: recipe,  // For future linking from meal to recipe in the UI.
        id: nanoid(),
        isChecked: false,
    }
}

const slice = createSlice({
    name: 'meals',
    initialState: {
        items: [
            createModel("Tacos", '2024-01-12'),
            createModel("Lentil Soup", '2024-01-14'),
            createModel("Channa + cauliflower", '2024-01-16'),
        ],
        aboutToAddMeal: undefined as (AboutToAddMealModel | undefined),
    },
    reducers: {
        createMeal: (state, action: PayloadAction<NameOwner & { datestamp: string, recipeId?: string }>) => {
            const {name, datestamp, recipeId} = action.payload
            const item = createModel(name, datestamp, recipeId)
            state.items.push(item)
        },
        reviewAddShoppingItems: (
            state,
            action: PayloadAction<NameOwner & { ingredientNames: NameOwner[], ingredients: IngredientModel[] }>
        ) => {
            const {name, ingredientNames, ingredients} = action.payload
            state.aboutToAddMeal = {
                name: name,
                ingredientNames: ingredientNames.map(it => ({...it, isChecked: false})),
                ingredients: ingredients.map(it => ({...it, isChecked: false})),
            }
        },
        updateAddShoppingItems: (state, action: PayloadAction<AboutToAddMealModel>) => {
            state.aboutToAddMeal = action.payload
        },
        confirmAddShoppingItems: (
            state,
            action: PayloadAction<{ ingredientNames: NameOwner[], ingredients: IngredientModel[] }>
        ) => {
            state.aboutToAddMeal = undefined
        },
        rescheduleMeal: (state, action: PayloadAction<IdOwner & { datestamp: string }>) => {
            const {id, datestamp} = action.payload
            // Add rescheduled meal to the start to it shows on top.
            const toReschedule = _.chain(state.items).remove(equalsId(id)).first().value()
            if (toReschedule) {
                toReschedule.datestamp = datestamp
                state.items = _.concat([toReschedule], state.items)
            }
        },
        renameMeal: renameItemReducer,
        toggleMealIsChecked: toggleIsCheckedReducer,
        deleteMeal: deleteItemReducer,
    }
})

const selectMealsInput = (state: RootState) => state.meals.items

export const selectMeals = createSelector(
    [selectMealsInput],
    (items) => _.orderBy(items, ['datestamp'], ['asc'])
)

export const selectAboutToAddMeal = createSelector(
    [(state: RootState) => state.meals],
    (meals) => meals.aboutToAddMeal
)

export const {
    createMeal,
    reviewAddShoppingItems,
    confirmAddShoppingItems,
    rescheduleMeal,
    renameMeal,
    toggleMealIsChecked,
    deleteMeal,
} = slice.actions

export default slice.reducer