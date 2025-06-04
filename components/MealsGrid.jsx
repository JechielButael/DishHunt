import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setMeals, selectMeals } from "../store/mealsSlice";
import { CiSearch } from "react-icons/ci";

const MealsGrid = ({ initialMeals, initialCategories, initialAreas }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(initialCategories || []);
  const [areas, setAreas] = useState(initialAreas || []);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  const dispatch = useDispatch();
  const meals = useSelector(selectMeals);

  const fetchMeals = async () => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => {
        dispatch(setMeals(res.data.meals));
      })
      .catch((err) => {
        console.error("Error fetching meals: ", err);
      });
  };

  useEffect(() => {
    if (initialMeals?.length) {
      dispatch(setMeals(initialMeals));
    }
  }, [initialMeals]);

  const filteredMeals = meals.filter((meal) => {
    const matchCategory =
      selectedCategory === "" || meal.strCategory === selectedCategory;
    const matchArea = selectedArea === "" || meal.strArea === selectedArea;
    return matchCategory && matchArea;
  });

  const sortedMeals = [...filteredMeals].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.strMeal.localeCompare(b.strMeal);
    } else if (sortOrder === "desc") {
      return b.strMeal.localeCompare(a.strMeal);
    } else {
      return 0;
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#3b3434]">
      <h1 className="text-6xl text-white font-edu  text-center p-8">
        DishHunt
      </h1>

      {/* Search Input & Button */}
      <div className="flex justify-center px-4 mb-4">
        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white w-full max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchMeals()}
            className="flex-1 px-4 py-2 text-black focus:outline-none rounded-full"
            placeholder="Search meals..."
          />
          <button
            onClick={fetchMeals}
            className="bg-[#5f5353] px-5 py-3 hover:bg-blue-600 transition text-white rounded-full"
          >
            <CiSearch className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Filters Row (New Line) */}
      <div className="flex flex-wrap mt-3 justify-center gap-4 px-4 mb-8">
        <select
          className="border-none text-[#808080] focus:outline-none bg-white border border-black rounded-full px-4 py-2"
          name="categories"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option value={category.strCategory} key={category.idCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>

        <select
          className="border-none text-[#808080] focus:outline-none bg-white border border-black rounded-full px-4 py-2"
          name="area"
          onChange={(e) => setSelectedArea(e.target.value)}
          value={selectedArea}
        >
          <option value="">All Areas</option>
          {areas.map((area) => (
            <option value={area.strArea} key={area.strArea}>
              {area.strArea}
            </option>
          ))}
        </select>

        <select
          className="border-none text-[#808080] focus:outline-none bg-white border border-black rounded-full px-4 py-2"
          name="sort"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="none">Sort</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
        {sortedMeals.map((meal) => (
          <Link href={`/meal/${meal.idMeal}`} key={meal.idMeal}>
            <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition duration-300 ease-in-out">
              <img
                className="w-full h-48 object-cover"
                src={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{meal.strMeal}</h2>
                <p className="text-sm text-gray-600">{meal.strCategory}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MealsGrid;
