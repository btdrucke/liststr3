import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import dayjs from 'dayjs'
import {RootState} from "../../app/store"
import _ from "lodash"
import {toDatestamp} from "../../common/dateUtils"
import {deleteItemReducer, equalsId, findById} from "../../common/IdOwner"
import {IsChecked, toggleIsCheckedReducer} from "../../common/IsChecked"

export interface MealModel extends BaseItem, IsChecked {
    readonly datestamp: string //YYYY-MM-DD
    readonly recipeId?: string
}

function createModel(name: string, datestamp?: string, id?: string, recipeId?: string): MealModel {
    return {
        name: name,
        datestamp: datestamp || toDatestamp(dayjs()),
        id: id || nanoid(),
        isChecked: false,
        recipeId: recipeId,
    }
}

const slice = createSlice({
    name: 'meals',
    initialState: {
        items: [
            createModel("Tacos", '2023-12-24'),
            createModel("Lentil Soup", '2023-12-26'),
            createModel("Channa + cauliflower", '2023-12-27'),
        ]
    },
    reducers: {
        createMeal: (state, action: PayloadAction<{ name: string, datestamp?: string, recipeId?: string }>) => {
            const {name, datestamp, recipeId} = action.payload
            const item = createModel(name, datestamp, recipeId)
            state.items.push(item)
        },
        rescheduleMeal: (state, action: PayloadAction<{ id: string, datestamp: string }>) => {
            const {id, datestamp} = action.payload
            // Add rescheduled meal to the start to it shows on top.
            const toReschedule = _.chain(state.items).remove(equalsId(id)).first().value()
            if (toReschedule) {
                console.log(`Setting ${id} to ${datestamp}`)
                toReschedule.datestamp = datestamp
                state.items = _.concat([toReschedule], state.items)
            }
        },
        renameMeal: renameItemReducer,
        toggleIsChecked: toggleIsCheckedReducer,
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
    (items, id) => findById(items, id)
)

export const {createMeal, rescheduleMeal, renameMeal, toggleIsChecked, deleteMeal} = slice.actions

export default slice.reducer