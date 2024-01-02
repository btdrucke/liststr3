import React from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import style from "./style.module.css"
import TrashControl from "../../common/TrashControl"
import {createItem, deleteItem, renameItem, selectItems} from "./slice"
import AddItem from "../../common/AddItem"

export const Markets = () => {
    const dispatch = useAppDispatch()
    const items = useAppSelector(selectItems)

    const onCreateFromName = (name: string) => {
        dispatch(createItem({name: name}))
    }

    return (
        <div className={style.list}>
            <AddItem
                placeholder={'+ new store'}
                createFromName={onCreateFromName}
            />
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