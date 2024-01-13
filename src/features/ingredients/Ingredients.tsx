import React from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import style from "./style.module.css"
import {createItem, selectItems} from "./slice"
import AddItem from "../../common/AddItem"
import {TagBar} from "../tags/TagBar"
import Ingredient from "./Ingredient"

export const Ingredients = () => {
    const dispatch = useAppDispatch()
    const itemList = useAppSelector(selectItems)

    const onCreateFromName = (name: string) => {
        dispatch(createItem({name: name}))
    }

    return (
        <div className={style.list}>
            <TagBar/>
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