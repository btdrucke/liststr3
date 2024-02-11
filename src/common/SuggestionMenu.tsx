import React, {useMemo} from "react"
import {getSuggestions} from "./searchUtils"
import style from "./style.module.css"
import {NamedBaseItem} from "./BaseItem"

interface SuggestionMenuProps<T extends NamedBaseItem> {
    queryStr: string
    suggestionItems: T[]
    onSuggestion: (suggestion: T) => void
    onNewSuggestion?: (suggestion: string) => void
}

const SuggestionMenu = <T extends NamedBaseItem>(
    {
        queryStr,
        suggestionItems,
        onSuggestion,
        onNewSuggestion
    }: SuggestionMenuProps<T>
) => {
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