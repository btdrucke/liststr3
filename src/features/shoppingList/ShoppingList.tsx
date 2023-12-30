import React from "react"
import {useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import AddInput from "../../common/AddInput"
import style from "./style.module.css"
import TrashControl from "../../common/TrashControl"
import {createItem, deleteItem, renameItem, selectItems, toggleIsChecked} from "./slice"
import IsCheckedControl from "../../common/IsCheckedControl"

export const ShoppingList = () => {
    const itemList = useAppSelector(selectItems)
    return (
        <div className={style.list}>
            <AddInput placeholder={'+ new item'} createFromName={createItem}/>
            {itemList.map((item) => {
                return (
                    <div
                        key={item.id}>
                        <IsCheckedControl
                            isChecked={item.isChecked}
                            action={toggleIsChecked(item.id)}/>
                        <EditableItem
                            origItem={item}
                            renameItem={renameItem}/>
                        <TrashControl action={deleteItem(item.id)}/>
                    </div>
                )
            })}
        </div>
    )
}