import style from './style.module.css'
import React, {ReactNode} from "react"
import {classes} from "./classUtils"
import {AppModePicker} from "../features/appMode/AppModePicker"

interface Props {
    children: ReactNode
    className?: string
}

export const Page: React.FC<Props> = ({children, className}) => {
    return (
        <div className={style.outerPage}>
            <div className={classes(style.page, className)}>
                <AppModePicker/>
                <div className={style.innerPage}>
                    {children}
                </div>
            </div>
        </div>
    )
}