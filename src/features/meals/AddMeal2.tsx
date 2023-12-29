import React, {useState} from "react"
import {useAppSelector} from "../../app/hooks"
import {AutoComplete, AutoCompleteCompleteEvent} from "primereact/autocomplete"
import {RecipeModel, selectRecipeItems} from "../recipes/slice"
import _ from "lodash"

interface AddMealProps {
    datestamp: string
}

const AddMeal2 = ({datestamp}: AddMealProps) => {
    // const dispatch = useAppDispatch()
    const recipes = useAppSelector(selectRecipeItems)
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeModel>()
    const [filteredRecipes, setFilteredRecipes] = useState<RecipeModel[]>([])

    const search = (event: AutoCompleteCompleteEvent) => {
        if (!event.query.trim().length) {
            setFilteredRecipes([...recipes])  // Copy.
        } else {
            const searchString = event.query.toLowerCase()
            const startsWith = recipes.filter(recipe => recipe.name.toLowerCase().startsWith(searchString))
            const includes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchString) && !startsWith.includes(recipe))
            setFilteredRecipes(_.concat(startsWith, includes))
        }
    }

    return (
        <div className="card flex justify-content-center">
            <AutoComplete
                field="name"
                value={selectedRecipe}
                suggestions={filteredRecipes}
                completeMethod={search}
                onChange={(e) => setSelectedRecipe(e.value)}
            />
        </div>
    )
}

export default AddMeal2