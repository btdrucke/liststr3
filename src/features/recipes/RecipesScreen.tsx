import {useAppSelector} from "../../app/hooks"
import {selectEditingRecipe} from "./slice"
import {Recipe} from "./Recipe"
import {Recipes} from "./Recipes"
import {Page} from "../../common/Page"

export const RecipesScreen = () => {
    const editingRecipe = useAppSelector(selectEditingRecipe)

    return (
        <Page>
            {editingRecipe === undefined && <Recipes/>}
            {editingRecipe !== undefined && <Recipe recipe={editingRecipe}/>}
        </Page>
    )
}