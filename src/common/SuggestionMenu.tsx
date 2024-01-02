import React, {useMemo} from "react"
import {getSuggestions} from "./searchUtils"
import style from "./style.module.css"
import {BaseItem} from "./BaseItem"

interface SuggestionMenuProps {
    queryStr: string
    suggestionItems: BaseItem[]
    onSuggestion: (suggestion: BaseItem) => void
    onNewSuggestion?: (suggestion: string) => void
}

const SuggestionMenu = ({queryStr, suggestionItems, onSuggestion, onNewSuggestion}: SuggestionMenuProps) => {
    const filteredItems = useMemo(() => getSuggestions(suggestionItems, queryStr), [suggestionItems, queryStr])

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
            {onNewSuggestion && (
                <div
                    className={style.suggestionItem}
                    onClick={() => onNewSuggestion(queryStr)}
                >
                    Add and remember for next time
                </div>
            )}
        </div>
    )
}

export default SuggestionMenu