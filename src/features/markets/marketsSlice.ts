import {createSlice, nanoid} from "@reduxjs/toolkit"
import {findIndexById, BaseItem, findById} from "../../common/BaseItem"
import style from "./markets.module.css"


export interface MarketModel extends BaseItem {
    readonly color: string;
}

function createMarketModel(name: string, color: string, id: string = nanoid()): MarketModel {
    return {id: id, name: name, color: color}
}

function colorForNewMarket(index: number): string {
    return style["marketBackground" + (index % 8)]
}

const marketsSlice = createSlice({
    name: 'markets',
    initialState: {
        value: [
            createMarketModel("Fred Meyer", colorForNewMarket(0)),
            createMarketModel("New Seasons", colorForNewMarket(1)),
            createMarketModel("Trader Joe's", colorForNewMarket(2)),
            createMarketModel("Costco", colorForNewMarket(3)),
        ]
    },
    reducers: {
        createMarket: (state, action) => {
            const marketName: string = action.payload
            const market = createMarketModel(marketName, colorForNewMarket(state.value.length))
            state.value.push(market)
        },
        renameMarket: (state, action) => {
            const market: BaseItem = action.payload
            const pos = findIndexById(state.value, market.id)
            if (pos >= 0) {
                const oldMarket = findById(state.value, market.id)
                if (oldMarket !== undefined) {
                    state.value.splice(pos, 1, {id: market.id, name: market.name, color: oldMarket.color})
                }
            }
        },
        deleteMarket: (state, action) => {
            const id: string = action.payload
            const pos = findIndexById(state.value, id)
            if (pos >= 0) {
                state.value.splice(pos, 1)
            }
        },
    }
})

export const {createMarket, renameMarket, deleteMarket} = marketsSlice.actions

export default marketsSlice.reducer