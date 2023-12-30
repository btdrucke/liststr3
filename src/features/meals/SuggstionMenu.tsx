import React, {useMemo} from "react"
import {suggestions} from "../../common/searchUtils"
import {useSelector} from "react-redux"
import style from "./style.module.css"
import {BaseItem} from "../../common/BaseItem"
import {nanoid} from "@reduxjs/toolkit"
import {selectItems} from "./slice"

interface SuggestionMenuProps {
    queryStr: string,
    onSuggestion: (item: BaseItem) => void
}

const SuggestionMenu = ({queryStr, onSuggestion}: SuggestionMenuProps) => {
    const items = useSelector(selectItems)
    const filteredItems = useMemo(() => suggestions(items, queryStr), [items, queryStr])

    return (
        <div className={style.suggestionMenu}>
            {filteredItems.map(item => (
                <div
                    key={item.id}
                    className={style.suggestionItem}
                    onClick={() => onSuggestion(item)}
                >
                    {item.name}
                </div>
            ))}
            <div
                className={style.suggestedItem}
                onClick={() => onSuggestion({name: queryStr, id: nanoid()})}
            >
                Add and remember for next time
            </div>
        </div>
    )
}

export default SuggestionMenu