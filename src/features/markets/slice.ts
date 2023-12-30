import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, renameItemReducer} from "../../common/BaseItem"
import style from "./style.module.css"
import {RootState} from "../../app/store"
import {deleteItemReducer, findById} from "../../common/IdOwner"
import {NameOwner} from "../../common/NameOwner"

export interface MarketModel extends BaseItem {
    readonly color: string;
}

function createMarketModel(name: string, color: string, id: string = nanoid()): MarketModel {
    return {id: id, name: name, color: color}
}

function colorForNewMarket(items: MarketModel[] | number): string {
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
    return style["marketBackground" + (i % 8)]
}

const slice = createSlice({
    name: 'markets',
    initialState: {
        items: [
            createMarketModel("Fred Meyer", colorForNewMarket(0)),
            createMarketModel("New Seasons", colorForNewMarket(1)),
            createMarketModel("Trader Joe's", colorForNewMarket(2)),
            createMarketModel("Costco", colorForNewMarket(3)),
        ]
    },
    reducers: {
        createItem: (state, action: PayloadAction<NameOwner>) => {
            const {name} = action.payload
            const item = createMarketModel(name, colorForNewMarket(state.items))
            state.items.push(item)
        },
        renameItem: renameItemReducer,
        deleteItem: deleteItemReducer,
    }
})

const selectItemsInput = (state: RootState) => state.markets.items

export const selectItems = createSelector(
    [selectItemsInput],
    (items) => items
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