import {selectItems as selectTags} from '../tags/slice'
import style from "./style.module.css"
import DraggableTag from "./DraggableTag"
import {useAppSelector} from "../../app/hooks"

interface Props {
    activeTagId?: string,
    onTagSelected?: (tagId: string | undefined) => void,
}

export const DraggableTags = ({activeTagId, onTagSelected}: Props) => {
    const tags = useAppSelector(selectTags)

    const handleOnClick = (tagId: string) => () => {
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