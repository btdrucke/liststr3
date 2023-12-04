import {createSelector, createSlice, nanoid} from "@reduxjs/toolkit"
import {BaseItem, findIndexById} from "../../common/BaseItem"
import dayjs, {Dayjs} from 'dayjs'
import {RootState} from "../../app/store"
import {deleteItemReducer, renameItemReducer} from "../../common/Reducers"

export interface MealModel extends BaseItem {
    readonly date: string //YYYY-MM-DD
    readonly recipeId?: string
}

function createMealModel(name: string, date: Dayjs = dayjs(), id: string = nanoid()): MealModel {
    return {id: id, name: name, date: toMealDate(date)}
}

export function toMealDate(date: Dayjs = dayjs()): string {
    return date.format('YYYY-MM-DD')
}

const slice = createSlice({
    name: 'meals',
    initialState: {
        items: [
            createMealModel("Tacos", dayjs('2023-12-31')),
            createMealModel("Lentil Soup", dayjs('2023-01-01')),
            createMealModel("Channa + cauliflower", dayjs('1969-05-09')),
        ]
    },
    reducers: {
        createMeal: (state, action) => {
            const payload: { name: string, date: Dayjs } = action.payload
            const item = createMealModel(payload.name, payload.date)
            state.items.push(item)
        },
        rescheduleMeal: (state, action) => {
            const payload: { id: string, name?: string, date?: Dayjs } = action.payload
            const pos = findIndexById(state.items, payload.id)
            if (pos >= 0) {
                if (payload.name !== undefined) {
                    state.items[pos].name = payload.name
                }
                if (payload.date !== undefined) {
                    state.items[pos].date = toMealDate(payload.date)
                }
            }
        },
        renameMeal: renameItemReducer,
        deleteMeal: deleteItemReducer,
    }
})

export const selectMealItems = createSelector(
    [(state: RootState) => state.meals.items],
    (items) => items
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