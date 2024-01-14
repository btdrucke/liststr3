import React, {useState} from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import style from "./style.module.css"
import {createItem, selectItems as selectShoppingItems} from "./slice"
import AddItem from "../../common/AddItem"
import {selectItems as selectIngredients} from "../ingredients/slice"
import {BaseItem} from "../../common/BaseItem"
import {DraggableTags} from "../tags/DraggableTags"
import {ShoppingItem} from "./ShoppingItem"
import {TagsOwner} from "../tags/TagsOwner"

export const ShoppingList = () => {
    const dispatch = useAppDispatch()
    const shoppingItems = useAppSelector(selectShoppingItems)
    const ingredients = useAppSelector(selectIngredients)
    const [activeTagId, setActiveTagId] = useState(undefined as string | undefined)

    const onCreateFromName = (name: string) => {
        dispatch(createItem({name: name}))
    }

    function isTagsOwner(test: any): test is TagsOwner {
        return (test as TagsOwner).tagIds !== undefined
    }

    const onCreateFromSuggestion = (suggestion: BaseItem) => {
        const tagsIds = isTagsOwner(suggestion) ? suggestion.tagIds : []
        dispatch(createItem({name: suggestion.name, ingredientId: suggestion.id, tagIds: tagsIds}))
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