import React from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import style from "./style.module.css"
import {createItem, deleteItem, renameItem, selectTags} from "./slice"
import AddItem from "../../common/AddItem"
import {TrashControl} from "../../common/IconControls"

export const TagsScreen = () => {
    const dispatch = useAppDispatch()
    const items = useAppSelector(selectTags)

    const onCreateFromName = (name: string) => {
        dispatch(createItem({name: name}))
    }

    return (
        <div className={style.list}>
            <AddItem
                placeholder={'+ new tag'}
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