import { useState, useEffect } from "react";
import MealItem from "./MealItem.jsx";
import useHttp from "../Hooks/useHttp.js";

const requestConfig = {};
export default function Meals() {

    const { data: loadedMeals, isLoading, error } = useHttp('http://localhost:3000/meals', {}, []);

    if (isLoading) {
        <p className="center">Fetching Meals..</p>
    }




    return <div>

        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    </div>
}