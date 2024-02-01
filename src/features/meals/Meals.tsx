import React, {useMemo, useState} from "react"
import {MealModel, selectAboutToAddMeal, selectMeals} from "./slice"
import {useAppSelector} from "../../app/hooks"
import style from "./style.module.css"
import _ from "lodash"
import MealDay from "./MealDay"
import {addDays, todayDatestamp} from "../../common/dateUtils"
import {Page} from "../../common/Page"
import {ReviewAddShoppingItems} from "./ReviewAddShoppingItems"
import {classes} from "../../common/classUtils"

interface MealDayModel {
    datestamp: string
    meals: MealModel[]
}

export const Meals = () => {
    const meals = useAppSelector(selectMeals)
    const aboutToAddMeal = useAppSelector(selectAboutToAddMeal)
    const [today, setToday] = useState(todayDatestamp)

    const otherToday = todayDatestamp()
    if (otherToday !== today) {
        setToday(otherToday)
    }

    const calculateMealDays = (today: string, meals: MealModel[]): MealDayModel[] => {
        const todayPlusWeek = addDays(today, 6)
        const earliestItem = _.first(meals)?.datestamp || today
        const latestItemPlusDay = addDays(_.last(meals)?.datestamp || today, 1)
        const firstDate = today < earliestItem ? today : earliestItem

        let days: MealDayModel[] = []
        for (
            let date = firstDate;
            !(date > todayPlusWeek && date > latestItemPlusDay);
            date = addDays(date, 1)
        ) {
            days.push({datestamp: date, meals: meals.filter(it => date === it.datestamp)})
        }
        return days
    }

    const days = useMemo(() => calculateMealDays(today, meals), [today, meals])

    return (
        <>
            <Page className={style.list}>
                <div className={style.table}>
                    {days.map(({datestamp, meals}) =>
                        <MealDay
                            key={datestamp}
                            datestamp={datestamp}
                            meals={meals}
                        />
                    )}
                </div>
            </Page>
            {aboutToAddMeal && <ReviewAddShoppingItems aboutToAddMeal={aboutToAddMeal}/>}
        </>
    )
}
