import React from "react"
import {useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import AddInput from "../../common/AddInput"
import style from "./style.module.css"
import TrashControl from "../../common/TrashControl"
import IsFavoriteControl from "../../common/IsFavoriteControl"
import {createItem, deleteItem, renameItem, selectItems, toggleIsFavorite} from "./slice"

export const Ingredients = () => {
    const itemList = useAppSelector(selectItems)
    return (
        <div className={style.list}>
            <AddInput placeholder={'+ new ingredient'} createFromName={createItem}/>
            {itemList.map((item) => {
                return (
                    <div
                        key={item.id}>
                        <IsFavoriteControl
                            isFavorite={item.isFavorite}
                            action={toggleIsFavorite(item.id)}/>
                        <EditableItem
                            origItem={item}
                            renameItem={renameItem}/>
                        <span>{new Date(item.lastUsedTimestamp).toLocaleDateString()}</span>
                        <TrashControl action={deleteItem(item.id)}/>
                    </div>
                )
            })}
        </div>
    )
}