import {NameOwner, OptionalNameOwner} from "./NameOwner"
import {findIndexById, IdOwner} from "./IdOwner"
import {Draft, PayloadAction} from "@reduxjs/toolkit"

export interface NamedBaseItem extends IdOwner, NameOwner {
}

export interface BaseItem extends IdOwner, OptionalNameOwner {
}

export const renameItemReducer = (
    state: Draft<{ items: BaseItem[] }>,
    action: PayloadAction<BaseItem>
) => {
    const item = action.payload
    const pos = findIndexById(state.items, item.id)
    if (pos >= 0) {
        state.items[pos].name = item.name
    }
}
