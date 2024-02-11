import {createSelector, Draft, EntityId, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../app/store"
import {findById, findIndexById, IdOwner} from "./IdOwner"

export const deleteItemReducer = (
    state: Draft<{ items: IdOwner[] }>,
    action: PayloadAction<EntityId>
) => {
    const id = action.payload
    const pos = findIndexById(state.items, id)
    if (pos >= 0) {
        state.items.splice(pos, 1)
    }
}

export const selectItemById = <T extends IdOwner>(selectInput: (state: RootState) => T[]) => createSelector(
    [
        selectInput,
        (_: RootState, id?: EntityId) => id
    ],
    (items, id) => (id && findById(items, id)) || undefined
)

export const selectItemsByIds = <T extends IdOwner>(selectInput: (state: RootState) => T[]) => createSelector(
    [
        selectInput,
        (_: RootState, ids: EntityId[]) => ids
    ],
    (items, ids) => {
        return ids.flatMap(id => {
            const item = findById(items, id)
            return (item === undefined) ? [] : [item]
        })
    }
)