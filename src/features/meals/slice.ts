import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import {RootState} from "../../app/store"
import _ from "lodash"
import {todayDatestamp} from "../../common/dateUtils"
import {deleteItemReducer, equalsId, findById} from "../../common/IdOwner"
import {IsChecked, toggleIsCheckedReducer} from "../../common/IsChecked"

export interface MealModel extends BaseItem, IsChecked {
    readonly datestamp: string //YYYY-MM-DD
    readonly recipeId?: string
}

function createModel(name: string, datestamp?: string, id?: string, recipeId?: string): MealModel {
    return {
        name: name,
        datestamp: datestamp || todayDatestamp(),
        id: id || nanoid(),
        recipeId: recipeId,
        isChecked: false,
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
        createItem: (state, action: PayloadAction<{ name: string, datestamp?: string, recipeId?: string }>) => {
            const {name, datestamp, recipeId} = action.payload
            const item = createModel(name, datestamp, recipeId)
            state.items.push(item)
        },
        rescheduleMeal: (state, action: PayloadAction<{ id: string, datestamp: string }>) => {
            const {id, datestamp} = action.payload
            // Add rescheduled meal to the start to it shows on top.
            const toReschedule = _.chain(state.items).remove(equalsId(id)).first().value()
            if (toReschedule) {
                toReschedule.datestamp = datestamp
                state.items = _.concat([toReschedule], state.items)
            }
        },
        renameItem: renameItemReducer,
        toggleIsChecked: toggleIsCheckedReducer,
        deleteItem: deleteItemReducer,
    }
})

const selectItemsInput = (state: RootState) => state.meals.items

export const selectItems = createSelector(
    [selectItemsInput],
    (items) => _.orderBy(items, ['datestamp'], ['asc'])
)

export const selectItem = createSelector(
    [
        selectItemsInput,
        (_: RootState, id: string) => id
    ],
    (items, id) => findById(items, id)
)

export const {
    createItem,
    rescheduleMeal,
    renameItem,
    toggleIsChecked,
    deleteItem,
} = slice.actions

export default slice.reducer