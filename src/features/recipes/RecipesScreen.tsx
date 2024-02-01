import {useAppSelector} from "../../app/hooks"
import {selectEditingRecipe} from "./slice"
import {Recipe} from "./Recipe"
import {Recipes} from "./Recipes"
import {Page} from "../../common/Page"

export const RecipesScreen = () => {
    const editingRecipe = useAppSelector(selectEditingRecipe)

    return (
        <>
            <Page>
                <Recipes/>
            </Page>
            {editingRecipe && <Recipe recipe={editingRecipe}/>}
        </>
    )
}