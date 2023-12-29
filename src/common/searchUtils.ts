import {NameOwner} from "./NameOwner"

export function suggestions<Type extends NameOwner>(items: Type[], query: string): Type[] {
    const searchString = query.trim().toLowerCase()
    let startsWith = items.filter(recipe => recipe.name.toLowerCase().startsWith(searchString))
    const includes = items.filter(recipe => recipe.name.toLowerCase().includes(searchString) && !startsWith.includes(recipe))
    return startsWith.concat(includes)
}