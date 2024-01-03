import React from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import style from "./style.module.css"
import TrashControl from "../../common/TrashControl"
import IsFavoriteControl from "../../common/IsFavoriteControl"
import {createItem, deleteItem, renameItem, selectItems, toggleIsFavorite} from "./slice"
import AddItem from "../../common/AddItem"
import EditControl from "../../common/EditControl"

export const Ingredients = () => {
    const dispatch = useAppDispatch()
    const itemList = useAppSelector(selectItems)

    const onCreateFromName = (name: string) => {
        dispatch(createItem({name: name}))
    }

    return (
        <div className={style.list}>
            <AddItem
                placeholder={'+ new ingredient'}
                createFromName={onCreateFromName}
            />
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