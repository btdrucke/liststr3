import {NameOwner} from "./NameOwner"
import {findIndexById, IdOwner} from "./IdOwner"
import {Draft, PayloadAction} from "@reduxjs/toolkit"

export interface BaseItem extends IdOwner, NameOwner {}

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
