import React from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import {createTag, deleteTag, renameTag, selectTags} from "./slice"
import AddItem from "../../common/AddItem"
import {TrashControl} from "../../common/IconControls"
import {Page} from "../../common/Page"
import style from "./style.module.css"
import {classes} from "../../common/classUtils"

export const TagsScreen = () => {
    const dispatch = useAppDispatch()
    const items = useAppSelector(selectTags)

    const onCreateFromName = (name: string) => {
        dispatch(createTag({name: name}))
    }

    return (
        <Page>
            <AddItem
                placeholder={'+ new tag'}
                createFromName={onCreateFromName}
            />
            <div className={style.list}>
                {items.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className={classes(style.listItem, item.color)}>
                            <EditableItem
                                origItem={item}
                                renameItem={renameTag}
                                extraClass={item.color}/>
                            <TrashControl action={deleteTag(item.id)}/>
                        </div>
                    )
                })}
            </div>
        </Page>
    )
}