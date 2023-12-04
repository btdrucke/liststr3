import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {createMeal, renameMeal, deleteMeal, selectMealItems} from "./slice"
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import AddInput from "../../common/AddInput"
import style from "./style.module.css"

export const Meals = () => {
    const dispatch = useAppDispatch()
    const itemList = useAppSelector(selectMealItems)
    return (
        <div className={style.list}>
            <AddInput placeholder={'+ new meal'} createFromName={createMeal}/>
            {itemList.map((item) => {
                return (
                    <div
                        key={item.id}>
                        <EditableItem
                            origItem={item}
                            renameItem={renameMeal}/>
                        <span>{item.date}</span>
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            onClick={() => dispatch(deleteMeal(item.id))}/>
                    </div>
                )
            })}
        </div>
    )
}