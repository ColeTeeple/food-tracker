import React from "react";
import { useEffect, useRef, useState } from "react";
import "../App.css";
import { Form, Button, Modal, ProgressBar, Navbar, Nav } from "react-bootstrap";
import { useFoodTracker } from "../context/FoodTrackerContext";

const FormInput = () => {
  const [currentFood, setCurrentFood] = useState("");
  const [amount, setAmount] = useState();
  const [calories, setCalories] = useState();
  const [protein, setProtein] = useState();
  const [fat, setFat] = useState();
  const [carbs, setCarbs] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const { setDailyCalories, setDailyCarbs, setDailyFat, setDailyProtein } =
    useFoodTracker();
  const [addedSuccessfully, setAddedSuccessfully] = useState("");

  const foodsAndCodes = [
    { food: "Apple", code: "2344711" },
    { food: "Banana", code: "1105314" },
    { food: "Bread (white)", code: "325871" },
    { food: "Bread (whole wheat)", code: "335240" },
    { food: "Cheddar Cheese", code: "2341112" },
    { food: "Chicken", code: "331960" },
    { food: "Eggs", code: "748967" },
    { food: "Peanut Butter", code: "2343014" },
    { food: "Rice (brown)", code: "1104812" },
    { food: "Rice (white)", code: "790214" },
    { food: "Protein Powder (whey isolate)", code: "173180"}
  ];

  const API_KEY = "vxfScgA7xQIvr6d4BZMrkUMtOPrcvFq3PnvpDy1O";
  const nameRef = useRef();
  const amountRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    setAddedSuccessfully("");
    const currentFood = nameRef.current.value;
    setCurrentFood(currentFood);
    const amount = amountRef.current.value;
    setAmount(amount);
    let code;

    foodsAndCodes.forEach((item) => {
      if (item.food === nameRef.current.value) {
        code = item.code;
      }
    });

    fetch(`https://api.nal.usda.gov/fdc/v1/food/${code}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) =>
        data.foodNutrients.map((nutrient) => {
          if (nutrient.nutrient.name === "Protein") {
            let proteinPerGram = nutrient.amount / 100;
            let proteinPerPortion = Math.round(
              proteinPerGram * parseInt(amount)
            );
            setProtein(proteinPerPortion);
          }
          if (nutrient.nutrient.name === "Total lipid (fat)") {
            let fatPerGram = nutrient.amount / 100;
            let fatPerPortion = Math.round(fatPerGram * parseInt(amount));
            setFat(fatPerPortion);
          }
          if (nutrient.nutrient.name === "Carbohydrate, by difference") {
            let carbsPerGram = nutrient.amount / 100;
            let carbsPerPortion = Math.round(carbsPerGram * parseInt(amount));
            setCarbs(carbsPerPortion);
          }
        })
      );
  }

  useEffect(() => {
    let caloriesToAdd = carbs * 4 + protein * 4 + fat * 9;
    setCalories(caloriesToAdd);
    setShowInfo(true);
  }, [calories, carbs, fat, protein]);

  function add() {
    setDailyCalories((currentCalories) => [...currentCalories, calories]);
    setDailyProtein((currentProtein) => [...currentProtein, protein]);
    setDailyFat((currentFat) => [...currentFat, fat]);
    setDailyCarbs((currentCarbs) => [...currentCarbs, carbs]);
    setAddedSuccessfully("Added Successfully");
  }

  return (
    <div className="container-div">
      <Form>
        <Form.Group id="food">
          <Form.Label>Food</Form.Label>
          <Form.Control as="select" ref={nameRef}>
            {foodsAndCodes.map((item) => {
              return <option>{item.food}</option>;
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group id="amount">
          <Form.Label>Amount (grams)</Form.Label>
          <Form.Control type="number" ref={amountRef}></Form.Control>
        </Form.Group>
        <Button type="submit" onClick={handleSubmit} variant="dark">
          View Info
        </Button>
      </Form>

      <div className="food-info">
        {showInfo == true && calories > 0 && (
          <>
            <h4>
              {amount}g of {currentFood}:
            </h4>
            <h5>Calories: {calories}</h5>
            <h5>Protein: {protein}g</h5>
            <h5>Fat: {fat}g</h5>
            <h5>Carbs: {carbs}g</h5>
            <Button onClick={add} variant="dark">
              Add
            </Button>
            <br></br>
            <br></br>
            {addedSuccessfully}
          </>
        )}
      </div>
    </div>
  );
};

export default FormInput;
