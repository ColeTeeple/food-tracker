import React from 'react'
import { Button, ProgressBar } from 'react-bootstrap'
import { useFoodTracker } from '../context/FoodTrackerContext'

const Totals = () => {
  const {dailyCaloriesLimit, dailyCarbsLimit, dailyFatLimit, dailyProteinLimit, dailyCalories, dailyCarbs, dailyFat, dailyProtein, setDailyCalories, setDailyCarbs, setDailyFat, setDailyProtein} = useFoodTracker();
  const dailyCaloriesTotal = Math.round(dailyCalories.reduce((total, index) => total + index, 0));
  const dailyCarbsTotal = Math.round(dailyCarbs.reduce((total, index) => total + index, 0));
  const dailyFatTotal = Math.round(dailyFat.reduce((total, index) => total + index, 0));
  const dailyProteinTotal = Math.round(dailyProtein.reduce((total, index) => total + index, 0));

  function reset() {
    setDailyCalories([]);
    setDailyCarbs([]);
    setDailyFat([]);
    setDailyProtein([]);
  }
  
  return (
    <div className="daily-totals-container">
    <div className="daily-totals">
        <h4>Calories: {dailyCaloriesTotal} / {dailyCaloriesLimit}</h4>
        <ProgressBar
          className="rounded-pill"
          variant="info"
          min={0}
          max={dailyCaloriesLimit}
          now={dailyCaloriesTotal}
        />
        <h4>Carbs: {dailyCarbsTotal}g / {dailyCarbsLimit}g</h4>
        <ProgressBar
          className="rounded-pill"
          variant="info"
          min={0}
          max={dailyCarbsLimit}
          now={dailyCarbsTotal}
        />
        <h4>Fat: {dailyFatTotal}g / {dailyFatLimit}g</h4>
        <ProgressBar
          className="rounded-pill"
          variant="info"
          min={0}
          max={dailyFatLimit}
          now={dailyFatTotal}
        />
        <h4>Protein: {dailyProteinTotal}g / {dailyProteinLimit}g</h4>
        <ProgressBar
          className="rounded-pill"
          variant="info"
          min={0}
          max={dailyProteinLimit}
          now={dailyProteinTotal}
        />
        
        
      </div>
      <Button onClick={reset} variant="dark">Reset</Button>
      </div>
  )
}

export default Totals
