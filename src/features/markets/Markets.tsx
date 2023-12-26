import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import AddInput from "../../common/AddInput"
import EditableItem from "../../common/EditableItem"
import {createMarket, deleteMarket, renameMarket, selectMarketItems} from "./slice"
import style from "./style.module.css"

export const Markets = () => {
    const dispatch = useAppDispatch()
    const items = useAppSelector(selectMarketItems)
    return (
        <div className={style.list}>
            <AddInput placeholder={'+ new store'} createFromName={createMarket}/>
            {items.map((item) => {
                return (
                    <div
                        key={item.id}
                        className={item.color}>
                        <EditableItem
                            origItem={item}
                            renameItem={renameMarket}
                            extraClass={item.color}/>
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            onClick={() => dispatch(deleteMarket(item.id))}/>
                    </div>
                )
            })}
        </div>
    )
}