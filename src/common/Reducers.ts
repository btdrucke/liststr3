import {Draft, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, findIndexById} from "./BaseItem"
import {IsFavoriteItem} from "./IsFavoriteItem"

export const deleteItemReducer = (
    state: Draft<{ items: BaseItem[] }>,
    action: PayloadAction<string>
) => {
    const id = action.payload
    const pos = findIndexById(state.items, id)
    if (pos >= 0) {
        state.items.splice(pos, 1)
    }
}

export const renameItemReducer = (
    state: Draft<{ items: BaseItem[] }>,
    action: PayloadAction<{ name: string, id: string }>
) => {
    const item = action.payload
    const pos = findIndexById(state.items, item.id)
    if (pos >= 0) {
        state.items[pos].name = item.name
    }
}

export const toggleIsFavoriteReducer = (state: Draft<{ items: (BaseItem & IsFavoriteItem)[] }>, action: PayloadAction<string>) => {
    const id = action.payload
    const pos = findIndexById(state.items, id)
    if (pos >= 0) {
        state.items[pos].isFavorite = !state.items[pos].isFavorite
    }
}