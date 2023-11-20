export function apply<T>(receiver: T, block: (arg0: T) => any): T {
    block(receiver)
    return receiver
}

export function run<T, R>(receiver: T, block: (arg0: T) => R): R {
    return block(receiver)
}