import {Draft, PayloadAction} from "@reduxjs/toolkit"
import {findIndexById, IdOwner} from "../../common/IdOwner"
import _ from "lodash"

export interface TagsOwner {
    readonly tagIds: string[]
}

export interface TagActionProps {
    itemOwnerId: string
    tagId: string
}

export const addTagReducer = (
    state: Draft<{ items: (IdOwner & TagsOwner)[] }>,
    action: PayloadAction<TagActionProps>
) => {
    const {itemOwnerId, tagId} = action.payload
    const pos = findIndexById(state.items, itemOwnerId)
    if (pos >= 0) {
        const item = state.items[pos]
        if (!_.includes(item.tagIds, tagId)) {
            item.tagIds.push(tagId)
        }
    }
}

export const removeTagReducer = (
    state: Draft<{ items: (IdOwner & TagsOwner)[] }>,
    action: PayloadAction<TagActionProps>
) => {
    const {itemOwnerId, tagId} = action.payload
    const pos = findIndexById(state.items, itemOwnerId)
    if (pos >= 0) {
        _.remove(state.items[pos].tagIds, id => id === tagId)
    }
}