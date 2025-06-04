import React from "react";
import MealsGrid from "../components/MealsGrid";
import axios from "axios";
import Head from "next/head";

export default function Home({
  initialMeals,
  initialCategories,
  initialAreas,
}) {
  return (
    <div>
      <Head>
        <title>DishHunt</title>
        <link rel="icon" href="/hamburger.png" />
      </Head>
      <MealsGrid
        initialMeals={initialMeals}
        initialCategories={initialCategories}
        initialAreas={initialAreas}
      />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const [mealsRes, categoriesRes, areasRes] = await Promise.all([
      axios.get("https://www.themealdb.com/api/json/v1/1/search.php?f=p"),
      axios.get("https://www.themealdb.com/api/json/v1/1/categories.php"),
      axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list"),
    ]);

    return {
      props: {
        initialMeals: mealsRes.data?.meals || [],
        initialCategories: categoriesRes.data?.categories || [],
        initialAreas: areasRes.data?.meals || [],
      },
    };
  } catch (error) {
    console.error("Error fetching initial data:", error);

    return {
      props: {
        initialMeals: [],
        initialCategories: [],
        initialAreas: [],
      },
    };
  }
}
