import {Draft, PayloadAction} from "@reduxjs/toolkit"
import {findIndexById, IdOwner} from "./IdOwner"

export interface IsChecked {
    readonly isChecked: boolean
}

export function isChecked(): (owner: IsChecked) => boolean {
    return (o) => o.isChecked
}

export function isNotChecked(): (owner: IsChecked) => boolean {
    return (o) => !o.isChecked
}


export const toggleIsCheckedReducer = (state: Draft<{ items: (IdOwner & IsChecked)[] }>, action: PayloadAction<string>) => {
    const id = action.payload
    const pos = findIndexById(state.items, id)
    if (pos >= 0) {
        state.items[pos].isChecked = !state.items[pos].isChecked
    }
}