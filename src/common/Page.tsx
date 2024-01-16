import style from './style.module.css'
import React, {ReactNode} from "react"
import {classes} from "./classUtils"

interface Props {
    children: ReactNode
    className?: string
}

export const Page: React.FC<Props> = ({children, className}) => {
    return (
        <div className={classes(style.page, className)}>
            {children}
        </div>
    )
}