import React, {useState} from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import style from "./style.module.css"
import {
    createShoppingItem,
    createShoppingItemFromIngredientId,
    createShoppingItemFromNewIngredient,
    selectShoppingItems
} from "./slice"
import AddItem from "../../common/AddItem"
import {IngredientModel, selectIngredients} from "../ingredients/slice"
import {DraggableTags} from "../tags/DraggableTags"
import {ShoppingItem} from "./ShoppingItem"
import {Page} from "../../common/Page"
import {EntityId} from "@reduxjs/toolkit"

export const ShoppingList = () => {
    const dispatch = useAppDispatch()
    const shoppingItems = useAppSelector(selectShoppingItems)
    const ingredients = useAppSelector(selectIngredients)
    const [activeTagId, setActiveTagId] = useState(undefined as EntityId | undefined)

    const onCreateFromName = (name: string) => {
        dispatch(createShoppingItem({name: name}))
    }

    const onCreateFromNewSuggestion = (name: string) => {
        dispatch(createShoppingItemFromNewIngredient({ingredientName: name}))
    }

    const onCreateFromSuggestion = (suggestion: IngredientModel) => {
        dispatch(createShoppingItemFromIngredientId({ingredientId: suggestion.id}))
    }

    const onTagSelected = (tagId?: EntityId) => {
        setActiveTagId(tagId)
    }

    const activeShoppingItems = shoppingItems.filter(item => {
        return !activeTagId || (item.tagIds === undefined) || item.tagIds.some(id => id === activeTagId)
    })

    return (
        <Page>
            <DraggableTags
                activeTagId={activeTagId}
                onTagSelected={onTagSelected}
            />
            <AddItem
                placeholder={"+ new item"}
                createFromName={onCreateFromName}
                suggestionItems={ingredients}
                createFromSuggestion={onCreateFromSuggestion}
                createFromNewSuggestion={onCreateFromNewSuggestion}
            />
            <div className={style.list}>
                {activeShoppingItems.map((item) => {
                    return (
                        <ShoppingItem
                            key={item.id}
                            item={item}
                        />
                    )
                })}
            </div>
        </Page>
    )
}