import {selectItems as selectTags} from '../tags/slice'
import {useState} from "react"
import style from "./style.module.css"
import DraggableTag from "./DraggableTag"
import {useAppSelector} from "../../app/hooks"

export const DraggableTags = () => {
    const tags = useAppSelector(selectTags)
    const [activeTagId, setActiveTagId] = useState(undefined as string | undefined)

    const handleOnClick = (tagId: string) => () => {
        const newTagId = activeTagId === tagId ? undefined : tagId
        setActiveTagId(newTagId)
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