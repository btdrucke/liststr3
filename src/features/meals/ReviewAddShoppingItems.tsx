import {Dialog} from "../../common/Dialog"
import {AboutToAddMealModel, confirmAddShoppingItems, toggleAddShoppingItem, toggleAllAddShoppingItems} from "./slice"
import IsCheckedControl from "../../common/IsCheckedControl"
import {isChecked, isNotChecked} from "../../common/IsChecked"
import {DoneControl} from "../../common/IconControls"
import style from "./style.module.css"

interface Props {
    aboutToAddMeal: AboutToAddMealModel
}

export const ReviewAddShoppingItems = ({aboutToAddMeal}: Props) => {

    const areSomeChecked = aboutToAddMeal.recipeIngredients.some(isChecked())
    const areSomeUnchecked = aboutToAddMeal.recipeIngredients.some(isNotChecked())
    const checkState = (areSomeChecked === areSomeUnchecked) ? undefined : areSomeChecked

    return (
        <Dialog>
            <div className={style.title}>
                <div>
                    Add from "{aboutToAddMeal.name}" to your shopping list?
                </div>
                <DoneControl action={confirmAddShoppingItems()}/>
            </div>
            <IsCheckedControl
                className={style.listItem}
                isChecked={checkState}
                action={toggleAllAddShoppingItems()}
            />
            <div className={style.list}>
                {aboutToAddMeal.recipeIngredients.map(recipeIngredient => {
                    const name = recipeIngredient.ingredientName || recipeIngredient.ingredient?.name
                    return name && (
                        <div
                            key={recipeIngredient.id}
                            className={style.listItem}
                        >
                            <IsCheckedControl
                                isChecked={recipeIngredient.isChecked}
                                action={toggleAddShoppingItem(recipeIngredient.id)}
                            />
                            {name}
                        </div>
                    )
                })}
            </div>
        </Dialog>
    )
}