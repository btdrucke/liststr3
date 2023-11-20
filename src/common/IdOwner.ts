import {nanoid} from '@reduxjs/toolkit'

type Id = string

export class IdOwner {
    id: Id

    constructor(id: Id = nanoid()) {
        this.id = id
    }
}

export function equalsId(id: Id): (other: string | IdOwner) => boolean {
    return (e) => {
        return (e instanceof IdOwner) ? e.id === id : e === id
    }
}

export function getById<Type extends IdOwner>(elems: Array<Type>, id: Id): Type | undefined {
    return elems.find(equalsId(id))
}

export function getIndexById<Type extends IdOwner>(elems: Array<Type>, id: Id): number {
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
