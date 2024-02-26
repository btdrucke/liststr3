import {createSelector, createSlice, EntityId, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"
import _ from "lodash"
import {IsFavorite, toggleIsFavoriteReducer} from "../../common/IsFavorite"
import {NamedBaseItem, renameItemReducer} from "../../common/BaseItem"
import {addTagReducer, removeTagReducer, TagsOwner} from "../tags/TagsOwner"
import {deleteItemReducer, selectItemById} from "../../common/IdOwnerRedux"
import {NameOwner} from "../../common/NameOwner"

export interface IngredientModel extends NamedBaseItem, IsFavorite, TagsOwner {
}

function createModel(name: string, id?: EntityId): IngredientModel {
    return {
        name: name,
        id: id || nanoid(),
        isFavorite: false,
        tagIds: [],
    }
}

const slice = createSlice({
    name: 'ingredients',
    initialState: {
        items: [
            createModel("Extra firm tofu"),
            createModel("English cucumber"),
            createModel("Silk protein milk"),
            createModel("Red onions"),
        ]
    },
    reducers: {
        createIngredient: (state, action: PayloadAction<NameOwner & {newId?: EntityId}>) => {
            const {name, newId} = action.payload
            const item = createModel(name, newId)
            state.items.push(item)
        },
        addTagToIngredient: addTagReducer,
        removeTagFromIngredient: removeTagReducer,
        renameIngredient: renameItemReducer,
        toggleIngredientIsFavorite: toggleIsFavoriteReducer,
        deleteIngredient: deleteItemReducer,
    }
})

const selectIngredientsInput = (state: RootState) => state.ingredients.items

export const selectIngredients = createSelector(
    [selectIngredientsInput],
    (items) => _.orderBy(
        items,
        ['isFavorite', 'name'],
        ['desc', 'desc', 'asc']
    )
)

export const selectIngredientById = selectItemById(selectIngredientsInput)

export const {
    createIngredient,
    addTagToIngredient,
    removeTagFromIngredient,
    renameIngredient,
    toggleIngredientIsFavorite,
    deleteIngredient,
} = slice.actions

export default slice.reducer