import React from "react"
import {DismissControl} from "../../common/IconControls"
import {classes} from "../../common/classUtils"
import style from "./style.module.css"
import {selectTagsByIds} from "./slice"
import {useAppSelector} from "../../app/hooks"
import {ActionCreatorWithPayload, EntityId} from "@reduxjs/toolkit"

interface TagActionProps {
    ownerId: EntityId
    tagId: EntityId
    referenceTagIds?: EntityId[]
}

interface Props {
    ownerId: EntityId,
    ownerTagIds?: EntityId[],
    referenceTagIds?: EntityId[],
    onRemoveTag: ActionCreatorWithPayload<TagActionProps>
}

const TagList = ({ownerId, ownerTagIds, referenceTagIds, onRemoveTag}: Props) => {
    const tagIds = ownerTagIds || referenceTagIds || []
    const itemTags = useAppSelector(state => selectTagsByIds(state, tagIds))

    return (
        <div className={style.tagList}>
            {itemTags.map(tag => {
                return (
                    <div
                        key={tag.id}
                        className={classes(style.tagListItem, tag.color)}
                    >
                        {tag.name}
                        <DismissControl
                            action={onRemoveTag({ownerId: ownerId, tagId: tag.id, referenceTagIds: referenceTagIds})}/>
                    </div>
                )
            })}
        </div>
    )
}

export default TagList