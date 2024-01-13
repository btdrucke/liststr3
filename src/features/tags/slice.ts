import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import style from "./style.module.css"
import {RootState} from "../../app/store"
import {deleteItemReducer, findById} from "../../common/IdOwner"
import {NameOwner} from "../../common/NameOwner"

export interface TagModel extends BaseItem {
    readonly color: string;
}

function createTagModel(name: string, color: string, id?: string): TagModel {
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
        createItem: (state, action: PayloadAction<NameOwner>) => {
            const {name} = action.payload
            const item = createTagModel(name, styleForNewTag(state.items))
            state.items.push(item)
        },
        renameItem: renameItemReducer,
        deleteItem: deleteItemReducer,
    }
})

const selectItemsInput = (state: RootState) => state.tags.items

export const selectItems = createSelector(
    [selectItemsInput],
    (items) => items
)

export const selectItemsByIds = createSelector(
    [
        selectItemsInput,
        (_: RootState, ids: string[]) => ids
    ],
    (items, ids) => {
        return ids.flatMap(id => {
            const item = findById(items, id)
            return (item === undefined) ? [] : [item]
        })
    }
)

export const selectItem = createSelector(
    [
        selectItemsInput,
        (_: RootState, id: string) => id
    ],
    (items, id) => findById(items, id)
)

export const {
    createItem,
    renameItem,
    deleteItem,
} = slice.actions

export default slice.reducer