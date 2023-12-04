import {createSelector, createSlice, Draft, nanoid, PayloadAction} from "@reduxjs/toolkit"
import {BaseItem, findIndexById} from "../../common/BaseItem"
import style from "./style.module.css"
import {RootState} from "../../app/store"
import {deleteItemReducer, renameItemReducer} from "../../common/Reducers"

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
        createMarket: (state, action: PayloadAction<string>) => {
            const name = action.payload
            const item = createMarketModel(name, colorForNewMarket(state.items))
            state.items.push(item)
        },
        renameMarket: renameItemReducer,
        deleteMarket: deleteItemReducer,
    }
})

export const selectMarketItems = createSelector(
    [(state: RootState) => state.markets.items],
    (items) => items
)

export const selectMarket = createSelector(
    [
        (state: RootState) => state.markets.items,
        (_: RootState, id: string) => id
    ],
    (items, id) => items.find(it => it.id === id)
)

export const {createMarket, renameMarket, deleteMarket} = slice.actions

export default slice.reducer