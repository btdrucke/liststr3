import {Draft, EntityId, PayloadAction} from "@reduxjs/toolkit"
import {findIndexById, IdOwner} from "./IdOwner"

export interface IsFavorite {
    readonly isFavorite: boolean
}

export const toggleIsFavoriteReducer = (state: Draft<{ items: (IdOwner & IsFavorite)[] }>, action: PayloadAction<EntityId>) => {
    const id = action.payload
    const pos = findIndexById(state.items, id)
    if (pos >= 0) {
        state.items[pos].isFavorite = !state.items[pos].isFavorite
    }
}