import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import {RootState} from "../../app/store"
import _ from "lodash"
import {IsFavorite, toggleIsFavoriteReducer} from "../../common/IsFavorite"
import {deleteItemReducer, equalsId, findById} from "../../common/IdOwner"
import {NameOwner} from "../../common/NameOwner"
import {createItem as createMeal} from "../meals/slice"

export interface RecipeModel extends BaseItem, IsFavorite {
}

function createModel(
    name: string,
    isFavorite: boolean = false,
    id: string = nanoid()
): RecipeModel {
    return {
        id: id, name: name, isFavorite: isFavorite,
    }
}

const slice = createSlice({
    name: 'ingredients',
    initialState: {
        items: [
            createModel("Enchiladas"),
            createModel("Burgers"),
            createModel("Stir Fry"),
            createModel("Middle Eastern"),
        ]
    },
    reducers: {
        createItem: (state, action: PayloadAction<NameOwner>) => {
            const {name} = action.payload
            const item = createModel(name)
            state.items.push(item)
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
                    const item = createModel(name, false, recipeId)
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

export const {
    createItem,
    renameItem,
    toggleIsFavorite,
    deleteItem,
} = slice.actions

export default slice.reducer