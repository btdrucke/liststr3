import '../index.css'
import {AppModePicker} from "../features/appMode/AppModePicker"
import {useAppSelector} from "./hooks"
import {AppMode} from "../features/appMode/appModeSlice"
import {ShoppingList} from "../features/shoppingList/ShoppingList"
import {Ingredients} from "../features/ingredients/Ingredients"
import {Shop} from "../features/shop/Shop"
import {Markets} from "../features/markets/Markets"
import {Meals} from "../features/meals/Meals"
import {Recipe} from "../features/recipe/Recipe"
import {Recipes} from "../features/recipes/Recipes"

const App = () => {
    const appMode = useAppSelector((state) => state.appMode.value)
    return (
        <>
            <AppModePicker/>
            {appMode === AppMode.ManageShoppingList && <ShoppingList/>}
            {appMode === AppMode.ManageIngredients && <Ingredients/>}
            {appMode === AppMode.ManageMarkets && <Markets/>}
            {appMode === AppMode.ManageMeals && <Meals/>}
            {appMode === AppMode.ManageRecipe && <Recipe/>}
            {appMode === AppMode.ManageRecipes && <Recipes/>}
            {appMode === AppMode.Shop && <Shop/>}
        </>
    )
}

export default App