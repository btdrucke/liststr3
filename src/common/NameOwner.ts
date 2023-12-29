export interface NameOwner {
    readonly name: string
}

export function equalsName(name: string): (owner: NameOwner) => boolean {
    return (o) => o.name === name
}
