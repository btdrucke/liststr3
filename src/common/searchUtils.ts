import {NameOwner} from "./NameOwner"
import _ from "lodash"

export function getSuggestions<Type extends NameOwner>(items: Type[], query: string): Type[] {
    const searchString = normalizeString(query)
    let startsWith = items.filter(item => normalizeString(item.name).startsWith(searchString))
    const includes = items.filter(item => normalizeString(item.name).includes(searchString) && !startsWith.includes(item))
    return startsWith.concat(includes)
}

export function normalizeMatches(arg1?: string, arg2?: string): boolean {
    if (arg1 === undefined || arg2 === undefined) {
        return arg1 === arg2
    } else {
        return normalizeString(arg1) === normalizeString(arg2)
    }
}

function normalizeString(arg: string): string {
    // TODO: remove non alphanumeric chars and reduce consecutive whitespace to single spaces.
    return _.deburr(arg.trim().toLowerCase())
}