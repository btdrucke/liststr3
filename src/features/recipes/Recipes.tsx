import React from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import style from "./style.module.css"
import IsFavoriteControl from "../../common/IsFavoriteControl"
import {createItem, deleteItem, editItem, renameItem, selectItems, toggleIsFavorite} from "./slice"
import AddItem from "../../common/AddItem"
import {EditControl, TrashControl} from "../../common/IconControls"

export const Recipes = () => {
    const dispatch = useAppDispatch()
    const itemList = useAppSelector(selectItems)

    const onCreateFromName = (name: string) => {
        dispatch(createItem({name: name}))
    }

    return (
        <div className={style.list}>
            <AddItem
                placeholder={'+ new recipe'}
                createFromName={onCreateFromName}
            />
            {itemList.map((item) => {
                return (
                    <div
                        key={item.id}>
                        <IsFavoriteControl
                            isFavorite={item.isFavorite}
                            action={toggleIsFavorite(item.id)}/>
                        <EditControl action={editItem(item.id)}/>
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