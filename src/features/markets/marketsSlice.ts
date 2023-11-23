import {createSlice} from "@reduxjs/toolkit"
import {findIndexById, IdOwner} from "../../common/IdOwner"
import style from "./markets.module.css"


export class MarketModel extends IdOwner {
    constructor(
        public readonly name: string,
        public readonly color: string,
        id?: string
    ) {
        super(id)
    }
}

function colorForNewMarket(index: number): string {
    return style["marketBackground" + (index % 8)]
}

const marketsSlice = createSlice({
    name: 'markets',
    initialState: {
        value: [
            new MarketModel("Fred Meyer", colorForNewMarket(0)),
            new MarketModel("New Seasons", colorForNewMarket(1)),
            new MarketModel("Trader Joe's", colorForNewMarket(2)),
            new MarketModel("Costco", colorForNewMarket(3)),
        ]
    },
    reducers: {
        createMarket: (state, action) => {
            const marketName: string = action.payload
            const market = new MarketModel(marketName, colorForNewMarket(state.value.length))
            state.value.push(market)
        },
        updateMarket: (state, action) => {
            const market: MarketModel = action.payload
            const pos = findIndexById(state.value, market.id)
            if (pos >= 0) {
                state.value[pos] = market
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

export const {createMarket, updateMarket, deleteMarket} = marketsSlice.actions

export default marketsSlice.reducer