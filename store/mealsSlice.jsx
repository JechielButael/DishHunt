const { createSlice } = require("@reduxjs/toolkit");

const mealsSlice = createSlice({
  name: "meals",
  initialState: {
    meals: [],
  },
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload;
    },
  },
});

export const { setMeals } = mealsSlice.actions;
export const selectMeals = (state) => state.meals.meals;
export default mealsSlice.reducer;
