import React from "react"
import EditableItem from "../../common/EditableItem"
import IsFavoriteControl from "../../common/IsFavoriteControl"
import {
    addTagToIngredient,
    deleteIngredient,
    IngredientModel,
    removeTagFromIngredient,
    renameIngredient,
    toggleIngredientIsFavorite
} from "./slice"
import {TrashControl} from "../../common/IconControls"
import {useDrop} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"
import {classes} from "../../common/classUtils"
import style from "./style.module.css"
import {selectTagsByIds, TagModel} from "../tags/slice"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import TagList from "../tags/TagList"

interface Props {
    item: IngredientModel
}

const Ingredient = ({item}: Props) => {
    const dispatch = useAppDispatch()

    const onDrop = (draggingItem: TagModel) => {
        dispatch(addTagToIngredient({itemOwnerId: item.id, tagId: draggingItem.id}))
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
                action={toggleIngredientIsFavorite(item.id)}/>
            <EditableItem
                origItem={item}
                renameItem={renameIngredient}/>
            <TrashControl action={deleteIngredient(item.id)}/>
            {item.tagIds && (
                <TagList
                    ownerId={item.id}
                    tagIds={item.tagIds}
                    onRemoveTag={removeTagFromIngredient}
                />
            )}
        </div>
    )
}

export default Ingredient