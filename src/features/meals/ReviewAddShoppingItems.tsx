import {Dialog} from "../../common/Dialog"
import {AboutToAddMealModel, confirmAddShoppingItems} from "./slice"
import IsCheckedControl from "../../common/IsCheckedControl"
import {isChecked, isNotChecked} from "../../common/IsChecked"
import {DoneControl} from "../../common/IconControls"

interface Props {
    aboutToAddMeal: AboutToAddMealModel
}

export const ReviewAddShoppingItems = ({aboutToAddMeal}: Props) => {

    const areSomeChecked = aboutToAddMeal.ingredientNames.some(isChecked()) ||
        aboutToAddMeal.ingredients.some(isChecked())
    const areSomeUnchecked = aboutToAddMeal.ingredientNames.some(isNotChecked()) ||
        aboutToAddMeal.ingredients.some(isNotChecked())
    const checkState = (areSomeChecked === areSomeUnchecked) ? undefined : areSomeChecked

    let index = 0
    return (
        <Dialog>
            <span>
                About to add {aboutToAddMeal.name}!
            </span>
            <DoneControl action={confirmAddShoppingItems(aboutToAddMeal)}/>
            <IsCheckedControl
                isChecked={checkState}
                action={{type: "nil"}}
            />
            {aboutToAddMeal.ingredientNames.map(ingredientName => (
                <div key={++index}>
                    <IsCheckedControl
                        isChecked={ingredientName.isChecked}
                        action={{type: "nil"}}
                    />
                    {ingredientName.name}
                </div>
            ))}
            {aboutToAddMeal.ingredients.map(ingredient => (
                <div key={ingredient.id}>
                    <IsCheckedControl
                        isChecked={ingredient.isChecked}
                        action={{type: "nil"}}
                    />
                    {ingredient.name}
                </div>
            ))}
        </Dialog>
    )
}