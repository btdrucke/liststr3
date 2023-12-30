import React from "react"
import {useAppSelector} from "../../app/hooks"
import AddInput from "../../common/AddInput"
import EditableItem from "../../common/EditableItem"
import style from "./style.module.css"
import TrashControl from "../../common/TrashControl"
import {createItem, deleteItem, renameItem, selectItems} from "./slice"

export const Markets = () => {
    const items = useAppSelector(selectItems)
    return (
        <div className={style.list}>
            <AddInput placeholder={'+ new store'} createFromName={createItem}/>
            {items.map((item) => {
                return (
                    <div
                        key={item.id}
                        className={item.color}>
                        <EditableItem
                            origItem={item}
                            renameItem={renameItem}
                            extraClass={item.color}/>
                        <TrashControl action={deleteItem(item.id)}/>
                    </div>
                )
            })}
        </div>
    )
}