import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, findIndexById} from "../../common/BaseItem"
import dayjs from 'dayjs'
import {RootState} from "../../app/store"
import {deleteItemReducer, renameItemReducer} from "../../common/Reducers"
import _ from "lodash"
import {toDatestamp} from "../../common/dateUtils"

export interface MealModel extends BaseItem {
    readonly datestamp: string //YYYY-MM-DD
    readonly recipeId?: string
}

function createMealModel(name: string, datestamp?: string, id?: string): MealModel {
    return {
        name: name,
        datestamp: datestamp || toDatestamp(dayjs()),
        id: id || nanoid(),
    }
}

const slice = createSlice({
    name: 'meals',
    initialState: {
        items: [
            createMealModel("Tacos", '2023-12-24'),
            createMealModel("Lentil Soup", '2023-12-26'),
            createMealModel("Channa + cauliflower", '2023-12-27'),
        ]
    },
    reducers: {
        createMeal: (state, action: PayloadAction<{ name: string, datestamp?: string }>) => {
            const {name, datestamp} = action.payload
            const item = createMealModel(name, datestamp)
            state.items.push(item)
        },
        rescheduleMeal: (state, action: PayloadAction<{ id: string, datestamp: string }>) => {
            const {id, datestamp} = action.payload
            const pos = findIndexById(state.items, id)
            if (pos >= 0) {
                console.log(`Setting ${id} to ${datestamp}`)
                state.items[pos].datestamp = datestamp
            }
        },
        swapMeals: (state, action: PayloadAction<{ idA: string, idB: string }>) => {
            const {idA, idB} = action.payload
            const posA = findIndexById(state.items, idA)
            const posB = findIndexById(state.items, idB)
            if (posA >= 0 && posB >= 0) {
                if (posA !== posB) {
                    console.log(`Swapping ${idA} with ${idB}`)
                    const datestampA = state.items[posA].datestamp
                    state.items[posA].datestamp = state.items[posB].datestamp
                    state.items[posB].datestamp = datestampA
                }
            }
        },
        renameMeal: renameItemReducer,
        deleteMeal: deleteItemReducer,
    }
})

export const selectMealItems = createSelector(
    [(state: RootState) => state.meals.items],
    (items) => _.orderBy(items, ['datestamp'], ['asc'])
)

export const selectMeal = createSelector(
    [
        (state: RootState) => state.meals.items,
        (_: RootState, id: string) => id
    ],
    (items, id) => items.find(it => it.id === id)
)

export const {createMeal, rescheduleMeal, swapMeals, renameMeal, deleteMeal} = slice.actions

export default slice.reducer