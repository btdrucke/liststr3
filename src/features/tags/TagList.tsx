import React from "react"
import {DismissControl} from "../../common/IconControls"
import {classes} from "../../common/classUtils"
import style from "./style.module.css"
import {selectTagsByIds} from "./slice"
import {useAppSelector} from "../../app/hooks"
import {TagActionProps, TagsOwner} from "./TagsOwner"
import {IdOwner} from "../../common/IdOwner"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"

interface Props {
    item: TagsOwner & IdOwner,
    onRemoveTag: ActionCreatorWithPayload<TagActionProps>
}

const TagList = ({item, onRemoveTag}: Props) => {
    const itemTags = useAppSelector(state => selectTagsByIds(state, item.tagIds))

    return (
        <div className={style.tagList}>
            {itemTags.map(tag => {
                return (
                    <div
                        key={tag.id}
                        className={classes(style.tagListItem, tag.color)}
                    >
                        {tag.name}
                        <DismissControl action={onRemoveTag({itemOwnerId: item.id, tagId: tag.id})}/>
                    </div>
                )
            })}
        </div>
    )
}

export default TagList