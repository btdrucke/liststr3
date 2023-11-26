import {createSlice, nanoid} from "@reduxjs/toolkit"
import {BaseItem, findById, findIndexById} from "../../common/BaseItem"

export interface IngredientModel extends BaseItem {
    readonly isFavorite: boolean;
    // readonly lastUsed: Date;
    readonly usualStores: string[]
}

function createIngredientModel(
    name: string,
    isFavorite: boolean = false,
    // lastUsed: Date = new Date(),
    usualStores: string[] = [],
    id: string = nanoid()
): IngredientModel {
    return {id: id, name: name, isFavorite: isFavorite,
        // lastUsed: lastUsed,
        usualStores: usualStores}
}

const slice = createSlice({
    name: 'ingredients',
    initialState: {
        items: [
            createIngredientModel("Extra firm tofu"),
            createIngredientModel("English cucumber"),
            createIngredientModel("Silk protein milk"),
            createIngredientModel("Red onions"),
        ]
    },
    reducers: {
        createIngredient: (state, action) => {
            const name: string = action.payload
            const item = createIngredientModel(name)
            state.items.push(item)
        },
        renameIngredient: (state, action) => {
            const item: BaseItem = action.payload
            const pos = findIndexById(state.items, item.id)
            if (pos >= 0) {
                const oldItem = findById(state.items, item.id)
                if (oldItem !== undefined) {
                    state.items.splice(pos, 1, {...oldItem, name: item.name})
                }
            }
        },
        deleteIngredient: (state, action) => {
            const id: string = action.payload
            const pos = findIndexById(state.items, id)
            if (pos >= 0) {
                state.items.splice(pos, 1)
            }
        },
    }
})

export const {createIngredient, renameIngredient, deleteIngredient} = slice.actions

export default slice.reducer