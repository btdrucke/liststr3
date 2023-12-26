import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import '../index.css'
import {AppModePicker} from "../features/appMode/AppModePicker"
import {useAppSelector} from "./hooks"
import {AppMode} from "../features/appMode/slice"
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
        <DndProvider backend={HTML5Backend}>
            <AppModePicker/>
            {appMode === AppMode.ManageShoppingList && <ShoppingList/>}
            {appMode === AppMode.ManageIngredients && <Ingredients/>}
            {appMode === AppMode.ManageMarkets && <Markets/>}
            {appMode === AppMode.ManageMeals && <Meals/>}
            {appMode === AppMode.ManageRecipe && <Recipe/>}
            {appMode === AppMode.ManageRecipes && <Recipes/>}
            {appMode === AppMode.Shop && <Shop/>}
        </DndProvider>
    )
}

export default App
