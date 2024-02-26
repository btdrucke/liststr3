import React from "react"
import EditableItem from "../../common/EditableItem"
import {
    addTagToShoppingItem,
    deleteShoppingItem,
    removeTagFromShoppingItem,
    renameShoppingItem,
    ShoppingItemModel,
    toggleShoppingItemIsChecked
} from "./slice"
import IsCheckedControl from "../../common/IsCheckedControl"
import {TrashControl} from "../../common/IconControls"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {TagModel} from "../tags/slice"
import {useDrop} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"
import {classes} from "../../common/classUtils"
import style from "./style.module.css"
import TagList from "../tags/TagList"
import {selectIngredientById} from "../ingredients/slice"

interface Props {
    item: ShoppingItemModel
}

export const ShoppingItem = ({item}: Props) => {
    const dispatch = useAppDispatch()
    const ingredient = useAppSelector(state => selectIngredientById(state, item.ingredientId))
    const ingredientTagIds = ingredient?.tagIds
    const tagIds = ingredientTagIds === undefined ? item.tagIds : ingredientTagIds

    const onDrop = (draggingItem: TagModel) => {
        dispatch(addTagToShoppingItem(
            {ownerId: item.id, tagId: draggingItem.id, referenceTagIds: ingredient?.tagIds}
        ))
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

    const isReference = item.name === undefined

    return (
        <div
            ref={drop}
            className={classes(style.listItem, isOver && canDrop && style.isOver, item.isChecked && style.isChecked)}
        >
            <IsCheckedControl
                isChecked={item.isChecked}
                action={toggleShoppingItemIsChecked(item.id)}
            />
            <EditableItem
                origItem={item}
                referenceName={ingredient?.name}
                renameItem={renameShoppingItem}
                extraClass={classes(isReference && style.reference)}
            />
            <TrashControl action={deleteShoppingItem(item.id)}/>
            {tagIds && (
                <TagList
                    ownerId={item.id}
                    ownerTagIds={item.tagIds}
                    referenceTagIds={ingredient?.tagIds}
                    onRemoveTag={removeTagFromShoppingItem}
                />
            )}
        </div>
    )
}