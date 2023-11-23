import {nanoid} from '@reduxjs/toolkit'

type Id = string

export class IdOwner {
    constructor(public readonly id: Id = nanoid()) {}
}

export function equalsId(id: Id): (owner: IdOwner) => boolean {
    return (o) => o.id === id
}

export function findById<Type extends IdOwner>(elems: Array<Type>, id: Id): Type | undefined {
    return elems.find(equalsId(id))
}

export function findIndexById<Type extends IdOwner>(elems: Array<Type>, id: Id): number {
    return elems.findIndex(equalsId(id))
}

export function updateOrAdd<Type extends IdOwner>(elems: Array<Type>, elem: Type): Array<Type> {
    const pos = elems.findIndex(equalsId(elem.id))
    if (pos === -1) {
        console.log("updateOrAdd: Didn't find {" + elem + "}")
        return [...elems, elem]
    } else {
        console.log("updateOrAdd: Found {" + elem + "} at pos " + pos)
        elems[pos] = elem
        return [...elems]
    }
}
