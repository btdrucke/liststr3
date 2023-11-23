import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {updateMarket, deleteMarket, MarketModel} from "./marketsSlice"
import style from "./markets.module.css"
import AddInput from "./AddInput"
import {classes} from "../../common/classUtils"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import React, {useState} from "react"


type EditableMarketProps = {
    origMarket: MarketModel
}
const EditableMarket = ({origMarket}: EditableMarketProps) => {
    const dispatch = useAppDispatch()

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement
        switch (event.key) {
            case "Enter": {
                event.preventDefault()
                const newName = input.value.trim()
                if (newName && newName !== origMarket.name) {
                    dispatch(updateMarket(new MarketModel(newName, origMarket.color, origMarket.id)))
                }
                input.blur()
                break
            }
            case "Escape": {
                input.value = origMarket.name
                input.blur()
                break
            }
        }
    }

    return (
        <input
            className={classes(style.market, origMarket.color)}
            defaultValue={origMarket.name}
            onKeyUp={handleKeyUp}
            onClick={event => {
                const element = event.target as HTMLInputElement
                element.focus()
            }}/>
    )
}

export const Markets = () => {
    const marketList = useAppSelector((state) => state.markets.value)
    const dispatch = useAppDispatch()
    return (
        <div className={style.marketsList}>
            <AddInput placeholder={'+ new store'}/>
            {marketList.map((market, index) => {
                return (
                    <div
                        key={market.id}
                        className={market.color}>
                        <EditableMarket
                            origMarket={market}/>
                        <FontAwesomeIcon
                            key={market.id + "trash"}
                            icon={faTrashCan}
                            className={style.add}
                            onClick={() => {
                                dispatch(deleteMarket(market.id))
                            }}/>
                    </div>
                )
            })}
        </div>
    )
}