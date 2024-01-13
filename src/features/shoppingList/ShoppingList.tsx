import React from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import style from "./style.module.css"
import {createItem, selectItems as selectShoppingItems} from "./slice"
import AddItem from "../../common/AddItem"
import {selectItems as selectIngredients} from "../ingredients/slice"
import {BaseItem} from "../../common/BaseItem"
import {TagBar} from "../tags/TagBar"
import {ShoppingItem} from "./ShoppingItem"

export const ShoppingList = () => {
    const dispatch = useAppDispatch()
    const shoppingItems = useAppSelector(selectShoppingItems)
    const ingredients = useAppSelector(selectIngredients)

    const onCreateFromName = (name: string) => {
        dispatch(createItem({name: name}))
    }

    const onCreateFromSuggestion = (suggestion: BaseItem) => {
        dispatch(createItem({name: suggestion.name, ingredientId: suggestion.id}))
    }

    return (
        <div className={style.list}>
            <TagBar/>
            <AddItem
                placeholder={"+ new item"}
                createFromName={onCreateFromName}
                suggestionItems={ingredients}
                createFromSuggestion={onCreateFromSuggestion}
            />
            {shoppingItems.map((item) => {
                return (
                    <ShoppingItem
                        key={item.id}
                        item={item}
                    />
                )
            })}
        </div>
    )
}