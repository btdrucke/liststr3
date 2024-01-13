import {TagModel} from './slice'
import style from "./style.module.css"
import {classes} from "../../common/classUtils"
import {useDrag} from "react-dnd"
import {DragTypes} from "../../common/DragTypes"

interface Props {
    tag: TagModel
    isActive?: boolean
    onClick: () => void
}

const DraggableTag = ({tag, isActive, onClick}: Props) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: DragTypes.TAG,
        item: tag,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }))
    const tagStyle = (isActive === undefined) ? null : (isActive ? style.tagEnabled : style.tagDisabled)

    return (
        <div
            ref={drag}
            className={classes(style.draggableTag, tag.color, tagStyle, isDragging && style.isDragging)}
            onClick={onClick}
        >
            {tag.name}
        </div>
    )
}

export default DraggableTag