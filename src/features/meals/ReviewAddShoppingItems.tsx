import {Dialog} from "../../common/Dialog"
import {AboutToAddMealModel, confirmAddShoppingItems, toggleAddShoppingItem, toggleAllAddShoppingItems} from "./slice"
import IsCheckedControl from "../../common/IsCheckedControl"
import {isChecked, isNotChecked} from "../../common/IsChecked"
import {DoneControl} from "../../common/IconControls"

interface Props {
    aboutToAddMeal: AboutToAddMealModel
}

export const ReviewAddShoppingItems = ({aboutToAddMeal}: Props) => {

    const areSomeChecked = aboutToAddMeal.recipeIngredients.some(isChecked())
    const areSomeUnchecked = aboutToAddMeal.recipeIngredients.some(isNotChecked())
    const checkState = (areSomeChecked === areSomeUnchecked) ? undefined : areSomeChecked

    return (
        <Dialog>
            <span>
                Add from "{aboutToAddMeal.name}" to your shopping list?
            </span>
            <DoneControl action={confirmAddShoppingItems()}/>
            <br/>
            <IsCheckedControl
                isChecked={checkState}
                action={toggleAllAddShoppingItems()}
            />
            {aboutToAddMeal.recipeIngredients.map(recipeIngredient => {
                const name = recipeIngredient.ingredientName || recipeIngredient.ingredient?.name
                return name && (
                    <div key={recipeIngredient.id}>
                        <IsCheckedControl
                            isChecked={recipeIngredient.isChecked}
                            action={toggleAddShoppingItem(recipeIngredient.id)}
                        />
                        {name}
                    </div>
                )
            })}
        </Dialog>
    )
}