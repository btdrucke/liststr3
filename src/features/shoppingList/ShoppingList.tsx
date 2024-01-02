import React from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import EditableItem from "../../common/EditableItem"
import style from "./style.module.css"
import TrashControl from "../../common/TrashControl"
import {createItem, deleteItem, renameItem, selectItems as selectShoppingItems, toggleIsChecked} from "./slice"
import IsCheckedControl from "../../common/IsCheckedControl"
import AddItem from "../../common/AddItem"
import {useSelector} from "react-redux"
import {selectItems as selectIngredients} from "../ingredients/slice"
import {BaseItem} from "../../common/BaseItem"
import {nanoid} from "@reduxjs/toolkit"

export const ShoppingList = () => {
    const dispatch = useAppDispatch()
    const shoppingItems = useAppSelector(selectShoppingItems)
    const ingredients = useSelector(selectIngredients)

    const onCreateFromName = (name: string) => {
        dispatch(createItem({name: name}))
    }

    const onCreateFromSuggestion = (suggestion: BaseItem) => {
        dispatch(createItem({name: suggestion.name, ingredientId: suggestion.id}))
    }

    const onCreateFromNewSuggestion = (name: string) => {
        dispatch(createItem({name: name, ingredientId: nanoid()}))
    }

    return (
        <div className={style.list}>
            <AddItem
                placeholder={"+ new item"}
                createFromName={onCreateFromName}
                suggestionItems={ingredients}
                createFromSuggestion={onCreateFromSuggestion}
                createFromNewSuggestion={onCreateFromNewSuggestion}
            />
            {shoppingItems.map((item) => {
                return (
                    <div key={item.id}>
                        <IsCheckedControl
                            isChecked={item.isChecked}
                            action={toggleIsChecked(item.id)}/>
                        <EditableItem
                            origItem={item}
                            renameItem={renameItem}/>
                        <TrashControl action={deleteItem(item.id)}/>
                    </div>
                )
            })}
        </div>
    )
}