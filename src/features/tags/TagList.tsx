import React from "react"
import {DismissControl} from "../../common/IconControls"
import {classes} from "../../common/classUtils"
import style from "./style.module.css"
import {selectTagsByIds, TagModel} from "./slice"
import {useAppSelector} from "../../app/hooks"
import {TagActionProps, TagsOwner} from "./TagsOwner"
import {IdOwner} from "../../common/IdOwner"
import {ActionCreatorWithPayload, EntityId} from "@reduxjs/toolkit"

interface Props {
    ownerId: EntityId,
    tagIds: EntityId[],
    onRemoveTag: ActionCreatorWithPayload<TagActionProps>
}

const TagList = ({ownerId, tagIds, onRemoveTag}: Props) => {
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
                        <DismissControl action={onRemoveTag({itemOwnerId: ownerId, tagId: tag.id})}/>
                    </div>
                )
            })}
        </div>
    )
}

export default TagList