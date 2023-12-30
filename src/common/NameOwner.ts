export interface NameOwner {
    readonly name: string
}

export function equalsName(name: string): (owner: NameOwner) => boolean {
    return (o) => o.name === name
}

export function names<Type extends NameOwner>(elems: Array<Type>): string[] {
    return elems.map(item => item.name)
}
