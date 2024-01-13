import React from "react"
import EditableItem from "../../common/EditableItem"
import IsFavoriteControl from "../../common/IsFavoriteControl"
import {addTag, deleteItem, IngredientModel, removeTag, renameItem, toggleIsFavorite} from "./slice"
import {DismissControl, TrashControl} from "../../common/IconControls"
import {useDrop} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"
import {classes} from "../../common/classUtils"
import style from "./style.module.css"
import {selectItemsByIds as selectTagsByIds, TagModel} from "../tags/slice"
import {useAppDispatch, useAppSelector} from "../../app/hooks"

interface Props {
    item: IngredientModel
}

const Ingredient = ({item}: Props) => {
    const dispatch = useAppDispatch()
    const itemTags = useAppSelector(state => selectTagsByIds(state, item.tagIds))

    const onDrop = (draggingItem: TagModel) => {
        dispatch(addTag({itemOwnerId: item.id, tagId: draggingItem.id}))
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
            className={classes(style.listItem, isOver && canDrop && style.isOver)}
        >
            <IsFavoriteControl
                isFavorite={item.isFavorite}
                action={toggleIsFavorite(item.id)}/>
            <EditableItem
                origItem={item}
                renameItem={renameItem}/>
            {itemTags && (
                <div className={style.itemTags}>
                    {itemTags.map(tag => {
                        return (
                            <div
                                key={tag.id}
                                className={classes(style.itemTag, tag.color)}
                            >
                                {tag.name}
                                <DismissControl action={removeTag({itemOwnerId: item.id, tagId: tag.id})}/>
                            </div>
                        )
                    })}
                </div>
            )}
            <TrashControl action={deleteItem(item.id)}/>
        </div>
    )
}

export default Ingredient