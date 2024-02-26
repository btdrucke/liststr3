import {createSelector, createSlice, EntityId, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, NamedBaseItem, renameItemReducer} from "../../common/BaseItem"
import {RootState} from "../../app/store"
import _ from "lodash"
import {equalsId, findById, IdOwner} from "../../common/IdOwner"
import {isChecked, IsChecked, toggleIsCheckedReducer} from "../../common/IsChecked"
import {NameOwner} from "../../common/NameOwner"
import {deleteItemReducer} from "../../common/IdOwnerRedux"
import {TagsOwner} from "../tags/TagsOwner"

export interface MealModel extends BaseItem, IsChecked {
    readonly datestamp: string, //YYYY-MM-DD
    readonly recipeId?: EntityId,
}

export interface AboutToAddRecipeIngredientModel extends IdOwner, IsChecked {
    ingredientName?: string
    ingredient?: NamedBaseItem & TagsOwner
}

export interface AboutToAddMealModel extends NameOwner {
    recipeIngredients: AboutToAddRecipeIngredientModel[]
}

function createModelFromName(datestamp: string, name: string): MealModel {
    return {
        name: name,
        datestamp: datestamp,
        recipeId: undefined,
        id: nanoid(),
        isChecked: false,
    }
}

function createModelFromRecipeId(datestamp: string, recipeId: EntityId): MealModel {
    return {
        name: undefined,
        datestamp: datestamp,
        recipeId: recipeId,
        id: nanoid(),
        isChecked: false,
    }
}

const slice = createSlice({
    name: 'meals',
    initialState: {
        items: [
            createModelFromName('2024-02-11', "Tacos"),
            createModelFromName('2024-02-12', "Lentil Soup"),
            createModelFromName('2024-02-15', "Channa + cauliflower"),
        ],
        aboutToAddMeal: undefined as (AboutToAddMealModel | undefined),
    },
    reducers: {
        createMeal: (state, action: PayloadAction<NameOwner & { datestamp: string }>) => {
            const {name, datestamp} = action.payload
            const item = createModelFromName(datestamp, name)
            state.items.push(item)
        },
        createMealFromRecipeId: (state, action: PayloadAction<{ datestamp: string, recipeId: EntityId }>) => {
            const {datestamp, recipeId} = action.payload
            const item = createModelFromRecipeId(datestamp, recipeId)
            state.items.push(item)
        },
        createMealFromNewRecipe: (state, action: PayloadAction<{ datestamp: string, recipeName: string }>) => {
            // Depends on middleware to create ingredient and dispatch createMealFromRecipeId.
        },
        reviewAddShoppingItems: (state, action: PayloadAction<AboutToAddMealModel>) => {
            state.aboutToAddMeal = action.payload
        },
        toggleAddShoppingItem: (state, action: PayloadAction<EntityId>) => {
            const recipeIngredientId = action.payload
            if (state.aboutToAddMeal) {
                const recipeIngredient = findById(state.aboutToAddMeal.recipeIngredients, recipeIngredientId)
                if (recipeIngredient) {
                    recipeIngredient.isChecked = !recipeIngredient.isChecked
                }
            }
        },
        toggleAllAddShoppingItems: (state) => {
            if (state.aboutToAddMeal) {
                const areAllChecked = state.aboutToAddMeal.recipeIngredients.every(isChecked())
                const newIsCheckedValue = !areAllChecked
                state.aboutToAddMeal.recipeIngredients.forEach(it => it.isChecked = newIsCheckedValue)
            }
        },
        confirmAddShoppingItems: (state) => {
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
    createMealFromRecipeId,
    createMealFromNewRecipe,
    reviewAddShoppingItems,
    toggleAddShoppingItem,
    toggleAllAddShoppingItems,
    confirmAddShoppingItems,
    rescheduleMeal,
    renameMeal,
    toggleMealIsChecked,
    deleteMeal,
} = slice.actions

export default slice.reducer