import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MealDetails() {
  const [meal, setMeal] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/meal?id=${id}`)
        .then((res) => setMeal(res.data))
        .catch((err) => console.log("Could not fetch meal details: ", err));
    }
  }, [id]);

  if (!meal)
    return (
      <div className="p-4 bg-[#3b3434] h-screen text-white pt-20 text-7xl text-center">
        Loading...
      </div>
    );

  return (
    <div className="bg-gradient-to-r from-gray-500 to-red-600 min-h-screen flex items-center justify-center p-4">
      <div className="p-4 max-w-md bg-[#e7ddd1] shadow-md rounded-xl w-full">
        <div className="p-1 font-bold transition-transform hover:translate-x-1">
          <button onClick={() => router.back()}>← Back</button>
        </div>

        <h1 className="text-lg font-bold m-3 text-center">{meal.strMeal}</h1>

        <img
          className="w-full h-48 rounded-xl object-cover"
          src={meal.strMealThumb}
          alt="meal pic"
        />

        <p className="my-2 text-sm">
          <strong>Meal ID:</strong> {meal.idMeal}
        </p>
        <p className="my-2 text-sm">
          <strong>Area:</strong> {meal.strArea}
        </p>

        {meal.strTags && (
          <p className="my-2 text-sm">
            <strong>Tags:</strong> {meal.strTags}
          </p>
        )}

        <div className="my-3">
          <h2 className="font-semibold text-sm mb-1">Ingredients:</h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            {Array.from({ length: 20 }).map((_, i) => {
              const ingredient = meal[`strIngredient${i + 1}`];
              const measure = meal[`strMeasure${i + 1}`];
              return (
                ingredient &&
                ingredient.trim() !== "" && (
                  <li key={i}>
                    {ingredient} {measure && `- ${measure}`}
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
