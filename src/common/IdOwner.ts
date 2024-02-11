import {EntityId} from "@reduxjs/toolkit"

export interface IdOwner {
    readonly id: EntityId
}

export function equalsId(id: EntityId): (owner: IdOwner) => boolean {
    return (o) => o.id === id
}

export function findById<Type extends IdOwner>(elems: Array<Type>, id: EntityId): Type | undefined {
    return elems.find(equalsId(id))
}

export function findIndexById<Type extends IdOwner>(elems: Array<Type>, id: EntityId): number {
    return elems.findIndex(equalsId(id))
}

export function ids<Type extends IdOwner>(elems: Array<Type>): EntityId[] {
    return elems.map(item => item.id)
}
