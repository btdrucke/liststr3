import style from './style.module.css'
import React, {ReactNode} from "react"
import {classes} from "./classUtils"

interface Props {
    children: ReactNode
    className?: string
}

export const Dialog: React.FC<Props> = ({children}) => {
    return (
        <div className={style.dialog}>
            <div className={style.dialogBackground}/>
            <div className={classes(style.dialogForeground)}>
                {children}
            </div>
        </div>
    )
}