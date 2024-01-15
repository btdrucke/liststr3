import React from "react"
import EditableItem from "../../common/EditableItem"
import {
    addTagToShoppingItem, deleteShoppingItem,
    removeTagFromShoppingItem,
    renameShoppingItem,
    ShoppingItemModel,
    toggleShoppingItemIsChecked
} from "./slice"
import IsCheckedControl from "../../common/IsCheckedControl"
import {TrashControl} from "../../common/IconControls"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {selectTagsByIds as selectTagsByIds, TagModel} from "../tags/slice"
import {useDrop} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"
import {classes} from "../../common/classUtils"
import style from "./style.module.css"
import TagList from "../tags/TagList"

interface Props {
    item: ShoppingItemModel
}

export const ShoppingItem = ({item}: Props) => {
    const dispatch = useAppDispatch()
    const itemTags = useAppSelector(state => selectTagsByIds(state, item.tagIds))

    const onDrop = (draggingItem: TagModel) => {
        dispatch(addTagToShoppingItem({itemOwnerId: item.id, tagId: draggingItem.id}))
    }

    const [{isOver, canDrop}, drop] = useDrop(
        () => ({
            accept: DragTypes.TAG,
            drop: onDrop,
            canDrop: () => true,
            collect: monitor => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            })
        }),
        [item]
    )

    return (
        <div
            ref={drop}
            className={classes(style.listItem, isOver && canDrop && style.isOver, item.isChecked && style.isChecked)}
        >
            <IsCheckedControl
                isChecked={item.isChecked}
                action={toggleShoppingItemIsChecked(item.id)}/>
            <EditableItem
                origItem={item}
                renameItem={renameShoppingItem}/>
            {itemTags && (
                <TagList
                    item={item}
                    onRemoveTag={removeTagFromShoppingItem}
                />
            )}
            <TrashControl action={deleteShoppingItem(item.id)}/>
        </div>
    )
}