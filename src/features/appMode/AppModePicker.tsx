import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {AppMode, selectAppMode, updateAppMode} from "./slice"
import style from "./style.module.css"
import {faBars, faListCheck, faTags, faUtensils} from "@fortawesome/free-solid-svg-icons"
import {faCalendarDays} from "@fortawesome/free-regular-svg-icons"
import {classes} from "../../common/classUtils"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const modeDisplayData = [
    {mode: AppMode.ManageShoppingList, title: "Shopping List", icon: faListCheck},
    {mode: AppMode.ManageMeals, title: "Meals", icon: faCalendarDays},
    {mode: AppMode.ManageRecipes, title: "Recipes", icon: faUtensils},
    {mode: AppMode.ManageIngredients, title: "Ingredients", icon: faBars},
    {mode: AppMode.ManageTags, title: "Tags", icon: faTags},
]

export const AppModePicker = () => {
    const dispatch = useAppDispatch()
    const appMode = useAppSelector(selectAppMode)
    return (
        <div className={style.appModePicker}>
            {modeDisplayData.map(({mode, title, icon}) => {
                return (
                    <div
                        key={mode}
                        className={classes(style.appModeControl, (appMode === mode) && style.enabled)}
                        onClick={() => dispatch(updateAppMode(mode))}
                    >
                        <FontAwesomeIcon icon={icon}/>
                        {title}
                    </div>
                )
            })}
        </div>
    )
}