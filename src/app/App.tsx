import '../index.css'
import {AppModePicker} from "../features/appMode/AppModePicker"
import {useAppSelector} from "./hooks"
import {AppMode} from "../features/appMode/slice"
import {ShoppingList} from "../features/shoppingList/ShoppingList"
import {Ingredients} from "../features/ingredients/Ingredients"
import {TagsScreen} from "../features/tags/TagsScreen"
import {Meals} from "../features/meals/Meals"
import {Recipe} from "../features/recipe/Recipe"
import {Recipes} from "../features/recipes/Recipes"
import React from "react"

const App = () => {
    const appMode = useAppSelector((state) => state.appMode.value)
    return (
        <>
            <AppModePicker/>
            {appMode === AppMode.ManageShoppingList && <ShoppingList/>}
            {appMode === AppMode.ManageIngredients && <Ingredients/>}
            {appMode === AppMode.ManageTags && <TagsScreen/>}
            {appMode === AppMode.ManageMeals && <Meals/>}
            {appMode === AppMode.ManageRecipe && <Recipe/>}
            {appMode === AppMode.ManageRecipes && <Recipes/>}
        </>
    )
}

export default App
