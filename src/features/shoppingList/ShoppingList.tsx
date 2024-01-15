import React, {useState} from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import style from "./style.module.css"
import {
    createShoppingItem,
    createShoppingItemFromIngredient,
    createShoppingItemFromNewIngredient,
    selectShoppingItems
} from "./slice"
import AddItem from "../../common/AddItem"
import {IngredientModel, selectIngredients} from "../ingredients/slice"
import {DraggableTags} from "../tags/DraggableTags"
import {ShoppingItem} from "./ShoppingItem"

export const ShoppingList = () => {
    const dispatch = useAppDispatch()
    const shoppingItems = useAppSelector(selectShoppingItems)
    const ingredients = useAppSelector(selectIngredients)
    const [activeTagId, setActiveTagId] = useState(undefined as string | undefined)

    const onCreateFromName = (name: string) => {
        dispatch(createShoppingItem(name))
    }

    const onCreateFromNewSuggestion = (name: string) => {
        dispatch(createShoppingItemFromNewIngredient(name))
    }

    const onCreateFromSuggestion = (suggestion: IngredientModel) => {
        dispatch(createShoppingItemFromIngredient({name: suggestion.name, tagIds: suggestion.tagIds}))
    }

    const onTagSelected = (tagId?: string) => {
        setActiveTagId(tagId)
    }

    const activeShoppingItems = shoppingItems.filter(item => !activeTagId || item.tagIds.some(id => id === activeTagId))

    return (
        <div className={style.list}>
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
            {activeShoppingItems.map((item) => {
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