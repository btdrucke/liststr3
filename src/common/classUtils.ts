export function classes(...classes: string[]): string {
    return classes.join(" ")
}

export function isEnabledClass(isEnabled: boolean): string {
    return isEnabled ? "enabled" : "disabled"
}

export function isCollapsedClass(isCollapsed: boolean): string {
    return isCollapsed ? "collapsed" : "expanded"
}