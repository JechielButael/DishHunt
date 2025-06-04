import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) return res.status(400).json({ error: "ID is required" });

  try {
    const meal = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    if (!meal.data.meals)
      return res.status(404).json({ error: "Meal not found" });

    res.status(200).json(meal.data.meals[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the meal" });
  }
}
