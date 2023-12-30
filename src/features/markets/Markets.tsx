import React from "react"
import {useAppSelector} from "../../app/hooks"
import AddInput from "../../common/AddInput"
import EditableItem from "../../common/EditableItem"
import {createMarket, deleteMarket, renameMarket, selectMarkets} from "./slice"
import style from "./style.module.css"
import TrashControl from "../../common/TrashControl"

export const Markets = () => {
    const items = useAppSelector(selectMarkets)
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
                        <TrashControl action={deleteMarket(item.id)}/>
                    </div>
                )
            })}
        </div>
    )
}