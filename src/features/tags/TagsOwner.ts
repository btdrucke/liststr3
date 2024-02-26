import {Draft, EntityId, PayloadAction} from "@reduxjs/toolkit"
import {findById, IdOwner} from "../../common/IdOwner"
import _ from "lodash"

export interface TagsOwner {
    readonly tagIds?: EntityId[]
}

export interface TagActionProps {
    ownerId: EntityId
    tagId: EntityId
    referenceTagIds?: EntityId[]
}

export const addTagReducer = (
    state: Draft<{ items: (IdOwner & TagsOwner)[] }>,
    action: PayloadAction<TagActionProps>
) => {
    const {ownerId, tagId, referenceTagIds} = action.payload
    const item = findById(state.items, ownerId)
    if (item) {
        if (item.tagIds === undefined) {
            item.tagIds = [...(referenceTagIds || []), tagId]
        } else if (!_.includes(item.tagIds, tagId)) {
            item.tagIds.push(tagId)
        }
        // If item.tagIds contains the same elements in any order as referenceTagIds, then set item.tagIds to undefined.
        if (_.isEqual(_.sortBy(item.tagIds), _.sortBy(referenceTagIds))) {
            console.log("addTagReducer: setting item.tagIds to undefined")
            item.tagIds = undefined
        }
    }
}

export const removeTagReducer = (
    state: Draft<{ items: (IdOwner & TagsOwner)[] }>,
    action: PayloadAction<TagActionProps>
) => {
    const {ownerId, tagId, referenceTagIds} = action.payload
    const item = findById(state.items, ownerId)
    if (item) {
        if (item.tagIds === undefined) {
            item.tagIds = [...(referenceTagIds || [])]
        }
        _.remove(item.tagIds, id => id === tagId)
    }
}