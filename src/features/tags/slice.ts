import {createSelector, createSlice, EntityId, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {NamedBaseItem, renameItemReducer} from "../../common/BaseItem"
import style from "./style.module.css"
import {RootState} from "../../app/store"
import {NameOwner} from "../../common/NameOwner"
import {deleteItemReducer, selectItemsByIds} from "../../common/IdOwnerRedux"

export interface TagModel extends NamedBaseItem {
    readonly color: string;
}

function createTagModel(name: string, color: string, id?: EntityId): TagModel {
    return {
        name: name,
        color: color,
        id: id || nanoid(),
    }
}

function styleForNewTag(items: TagModel[] | number): string {
    if (typeof items === "number") {
        return colorForNumber(items)
    } else {
        const usedColors = items.map(it => it.color)
        let i = 0
        let thisStyle: string
        do {
            thisStyle = colorForNumber(i)
            if (!usedColors.includes(thisStyle)) break
            ++i
        } while (i < 8)
        return thisStyle
    }
}

function colorForNumber(i: number): string {
    return style["tagStyle" + (i % 8)]
}

const slice = createSlice({
    name: 'tags',
    initialState: {
        items: [
            createTagModel("Fred Meyer", styleForNewTag(0)),
            createTagModel("New Seasons", styleForNewTag(1)),
            createTagModel("Trader Joe's", styleForNewTag(2)),
            createTagModel("Costco", styleForNewTag(3)),
        ]
    },
    reducers: {
        createTag: (state, action: PayloadAction<NameOwner>) => {
            const {name} = action.payload
            const item = createTagModel(name, styleForNewTag(state.items))
            state.items.push(item)
        },
        renameTag: renameItemReducer,
        deleteTag: deleteItemReducer,
    }
})

const selectTagsInput = (state: RootState) => state.tags.items

export const selectTags = createSelector(
    [selectTagsInput],
    (items) => items
)

export const selectTagsByIds = selectItemsByIds(selectTagsInput)

export const {
    createTag,
    renameTag,
    deleteTag,
} = slice.actions

export default slice.reducer