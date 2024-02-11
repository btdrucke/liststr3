import {selectTags} from './slice'
import style from "./style.module.css"
import DraggableTag from "./DraggableTag"
import {useAppSelector} from "../../app/hooks"
import {EntityId} from "@reduxjs/toolkit"

interface Props {
    activeTagId?: EntityId,
    onTagSelected?: (tagId: EntityId | undefined) => void,
}

export const DraggableTags = ({activeTagId, onTagSelected}: Props) => {
    const tags = useAppSelector(selectTags)

    const handleOnClick = (tagId: EntityId) => () => {
        if (onTagSelected) {
            const newTagId = activeTagId === tagId ? undefined : tagId
            onTagSelected(newTagId)
        }
    }

    return (
        <div className={style.draggableTags}>
            {tags.map(tag => {
                return (
                    <DraggableTag
                        key={tag.id}
                        tag={tag}
                        isActive={activeTagId ? (activeTagId === tag.id) : undefined}
                        onClick={handleOnClick(tag.id)}
                    />
                )
            })}
        </div>
    )
}