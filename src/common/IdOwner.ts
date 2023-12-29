import {Draft, PayloadAction} from "@reduxjs/toolkit"

type Id = string

export interface IdOwner {
    readonly id: string
}

export function equalsId(id: Id): (owner: IdOwner) => boolean {
    return (o) => o.id === id
}

export function findById<Type extends IdOwner>(elems: Array<Type>, id: Id): Type | undefined {
    return elems.find(equalsId(id))
}

export function findIndexById<Type extends IdOwner>(elems: Array<Type>, id: Id): number {
    return elems.findIndex(equalsId(id))
}

export const deleteItemReducer = (
    state: Draft<{ items: IdOwner[] }>,
    action: PayloadAction<string>
) => {
    const id = action.payload
    const pos = findIndexById(state.items, id)
    if (pos >= 0) {
        state.items.splice(pos, 1)
    }
}
