export function classes(...classes: (string | null | undefined | string[])[]): string {
    return classes.flat().filter(it => it).join(" ")
}

export function isEnabledClass(isEnabled: boolean): string {
    return isEnabled ? "enabled" : "disabled"
}

export function isCollapsedClass(isCollapsed: boolean): string {
    return isCollapsed ? "collapsed" : "expanded"
}