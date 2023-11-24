import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {createMarket, renameMarket, deleteMarket} from "./marketsSlice"
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import AddInput from "../../common/AddInput"
import style from "./markets.module.css"

export const Markets = () => {
    const marketList = useAppSelector((state) => state.markets.value)
    const dispatch = useAppDispatch()
    return (
        <div className={style.list}>
            <AddInput placeholder={'+ new store'} createFromName={createMarket}/>
            {marketList.map((market, index) => {
                return (
                    <div
                        key={market.id}
                        className={market.color}>
                        <EditableItem
                            origItem={market}
                            renameItem={renameMarket}
                            extraClasses={[market.color]}/>
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