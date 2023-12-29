type Id = string

export interface NameOwner {
    readonly name: string
}

export interface IdOwner {
    readonly id: string
}

export interface BaseItem extends IdOwner, NameOwner {}

export function equalsId(id: Id): (owner: IdOwner) => boolean {
    return (o) => o.id === id
}

export function equalsName(name: string): (owner: NameOwner) => boolean {
    return (o) => o.name === name
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
