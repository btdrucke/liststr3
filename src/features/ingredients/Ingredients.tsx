import React from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import style from "./style.module.css"
import {createIngredient, selectIngredients} from "./slice"
import AddItem from "../../common/AddItem"
import {DraggableTags} from "../tags/DraggableTags"
import Ingredient from "./Ingredient"
import {Page} from "../../common/Page"

export const Ingredients = () => {
    const dispatch = useAppDispatch()
    const itemList = useAppSelector(selectIngredients)

    const onCreateFromName = (name: string) => {
        dispatch(createIngredient({name: name}))
    }

    return (
        <Page>
            <DraggableTags/>
            <AddItem
                placeholder={'+ new ingredient'}
                createFromName={onCreateFromName}
            />
            <div className={style.list}>
                {itemList.map((item) => {
                    return (
                        <Ingredient
                            key={item.id}
                            item={item}
                        />
                    )
                })}
            </div>
        </Page>
    )
}