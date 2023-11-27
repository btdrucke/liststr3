import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {AppMode, selectAppMode, updateMode} from "./slice"
import style from "./style.module.css"

const modeDisplayData = [
    {mode: AppMode.ManageMeals, title: "Manage Meals"},
    {mode: AppMode.ManageRecipes, title: "Manage Recipes"},
    {mode: AppMode.ManageRecipe, title: "Manage Recipe"},
    {mode: AppMode.ManageIngredients, title: "Manage Ingredients"},
    {mode: AppMode.ManageShoppingList, title: "Manage Shopping List"},
    {mode: AppMode.ManageMarkets, title: "Manage Markets"},
    {mode: AppMode.Shop, title: "Shop"},
]

export const AppModePicker = () => {
    const dispatch = useAppDispatch()
    const appMode = useAppSelector(selectAppMode)
    return (
        <div className={style.appModePicker}>
            {modeDisplayData.map(({mode, title}) => {
                return (
                    <button
                        key={mode}
                        className={(appMode === mode) ? style.enabled : style.disabled}
                        onClick={() => dispatch(updateMode(mode))}>{title}
                    </button>
                )
            })}
        </div>
    )
}