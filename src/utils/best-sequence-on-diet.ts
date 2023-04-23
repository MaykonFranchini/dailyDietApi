import { Meal } from '@prisma/client'
import { format } from 'date-fns'

export function bestSequenceOnDiet(meals: Meal[]) {
  const mealsOnDiet = meals.filter((meal) => meal.is_on_diet === true)

  const formattedMealsDate = mealsOnDiet.map((meal) => {
    const newDate = format(new Date(meal.created_at), 'dd-MM-yyyy')
    return {
      ...meal,
      created_at: newDate,
    }
  })

  if (mealsOnDiet.length > 0) {
    const mealsByDate: any = {}

    let currentDay = formattedMealsDate[0].created_at
    let currentDayMeals: any = []

    for (const meal of formattedMealsDate) {
      if (meal.created_at === currentDay) {
        currentDayMeals.push(meal)
      } else {
        if (currentDayMeals.length > 0) {
          mealsByDate[currentDay] = currentDayMeals
        }
        currentDay = meal.created_at
        currentDayMeals = [meal]
      }
    }

    mealsByDate[currentDay] = currentDayMeals

    let sequence = 0
    let bestDaySequence: any

    // eslint-disable-next-line array-callback-return
    Object.keys(mealsByDate).map((key) => {
      const count = mealsByDate[key].filter(
        (meal: Meal) => meal.is_on_diet === true,
      )
      if (count.length > sequence) {
        sequence = count.length
        bestDaySequence = { [key]: count.length }
      }
    })

    return {
      bestDaySequence,
      meals: mealsByDate[Object.keys(bestDaySequence).toString()],
    }
  }
  return []
}
