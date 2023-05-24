import { createContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FoodTrackerContext = createContext();

export const useFoodTracker = () => {
  return useContext(FoodTrackerContext);
};

export const FoodTrackerProvider = ({ children }) => {
  const [dailyCaloriesLimit, setDailyCaloriesLimit] = useLocalStorage(
    "daily-calories-limit",
    0
  );
  const [dailyCarbsLimit, setDailyCarbsLimit] = useLocalStorage(
    "daily-carbs-limit",
    0
  );
  const [dailyFatLimit, setDailyFatLimit] = useLocalStorage("daily-fat-limit", 0);
  const [dailyProteinLimit, setDailyProteinLimit] = useLocalStorage(
    "daily-protein-limit",
    0
  );
  const [showModal, setShowModal] = useState(false);
  const [dailyCalories, setDailyCalories] = useLocalStorage("daily-calories", []);
  const [dailyProtein, setDailyProtein] = useLocalStorage("daily-protein", []);
  const [dailyFat, setDailyFat] = useLocalStorage("daily-fat", []);
  const [dailyCarbs, setDailyCarbs] = useLocalStorage("daily-carbs", []);

  function updateValues(
    dailyCaloriesRef,
    dailyCarbsRef,
    dailyFatRef,
    dailyProteinRef
  ) {
    setDailyCaloriesLimit(dailyCaloriesRef);
    setDailyCarbsLimit(dailyCarbsRef);
    setDailyFatLimit(dailyFatRef);
    setDailyProteinLimit(dailyProteinRef);
    setShowModal(false);
  }

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  return (
    <FoodTrackerContext.Provider
      value={{
        createUser,
        signIn,
        dailyCaloriesLimit,
        dailyCarbsLimit,
        dailyFatLimit,
        dailyProteinLimit,
        showModal,
        updateValues,
        setShowModal,
        dailyCalories,
        setDailyCalories,
        dailyCarbs,
        setDailyCarbs,
        dailyFat, 
        setDailyFat,
        dailyProtein,
        setDailyProtein
      }}
    >
      {children}
    </FoodTrackerContext.Provider>
  );
};
