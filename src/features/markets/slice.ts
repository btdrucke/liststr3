import {createSlice, nanoid} from "@reduxjs/toolkit"
import {BaseItem, findById, findIndexById} from "../../common/BaseItem"
import style from "./style.module.css"

export interface MarketModel extends BaseItem {
    readonly color: string;
}

function createMarketModel(name: string, color: string, id: string = nanoid()): MarketModel {
    return {id: id, name: name, color: color}
}

function colorForNewMarket(index: number): string {
    return style["marketBackground" + (index % 8)]
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
        createMarket: (state, action) => {
            const name: string = action.payload
            const item = createMarketModel(name, colorForNewMarket(state.items.length))
            state.items.push(item)
        },
        renameMarket: (state, action) => {
            const item: BaseItem = action.payload
            const pos = findIndexById(state.items, item.id)
            if (pos >= 0) {
                const oldItem = findById(state.items, item.id)
                if (oldItem !== undefined) {
                    state.items.splice(pos, 1, {...oldItem, name: item.name})
                }
            }
        },
        deleteMarket: (state, action) => {
            const id: string = action.payload
            const pos = findIndexById(state.items, id)
            if (pos >= 0) {
                state.items.splice(pos, 1)
            }
        },
    }
})

export const {createMarket, renameMarket, deleteMarket} = slice.actions

export default slice.reducer