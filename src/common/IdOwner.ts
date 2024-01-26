type Id = string

export interface IdOwner {
    readonly id: string
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

export function ids<Type extends IdOwner>(elems: Array<Type>): Id[] {
    return elems.map(item => item.id)
}
