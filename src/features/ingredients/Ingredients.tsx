import React from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import style from "./style.module.css"
import {createItem, selectIngredients} from "./slice"
import AddItem from "../../common/AddItem"
import {DraggableTags} from "../tags/DraggableTags"
import Ingredient from "./Ingredient"

export const Ingredients = () => {
    const dispatch = useAppDispatch()
    const itemList = useAppSelector(selectIngredients)

    const onCreateFromName = (name: string) => {
        dispatch(createItem({name: name}))
    }

    return (
        <div className={style.list}>
            <DraggableTags/>
            <AddItem
                placeholder={'+ new ingredient'}
                createFromName={onCreateFromName}
            />
            {itemList.map((item) => {
                return (
                    <Ingredient
                        key={item.id}
                        item={item}
                    />
                )
            })}
        </div>
    )
}