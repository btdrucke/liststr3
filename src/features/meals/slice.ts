import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, findIndexById} from "../../common/BaseItem"
import dayjs, {Dayjs} from 'dayjs'
import {RootState} from "../../app/store"
import {deleteItemReducer, renameItemReducer} from "../../common/Reducers"
import _ from "lodash"
import {toDatestamp} from "../../common/dateUtils"

export interface MealModel extends BaseItem {
    readonly datestamp: string //YYYY-MM-DD
    readonly recipeId?: string
}

function createMealModel(name: string, date: Dayjs = dayjs(), id: string = nanoid()): MealModel {
    return {id: id, name: name, datestamp: toDatestamp(date)}
}

const slice = createSlice({
    name: 'meals',
    initialState: {
        items: [
            createMealModel("Tacos", dayjs('2023-12-24')),
            createMealModel("Lentil Soup", dayjs('2023-12-26')),
            createMealModel("Channa + cauliflower", dayjs('2023-12-27')),
        ]
    },
    reducers: {
        createMeal: (state, action: PayloadAction<{ name: string, date?: Dayjs }>) => {
            const {name, date} = action.payload
            const item = createMealModel(name, date)
            state.items.push(item)
        },
        rescheduleMeal: (state, action: PayloadAction<{ id: string, date: Dayjs }>) => {
            const {id, date} = action.payload
            const pos = findIndexById(state.items, id)
            if (pos >= 0) {
                state.items[pos].datestamp = toDatestamp(date)
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

export const {createMeal, rescheduleMeal, renameMeal, deleteMeal} = slice.actions

export default slice.reducer