import { createSlice } from "@reduxjs/toolkit";

const labelSlice = createSlice({
  name: "labels",
  initialState: {
    all: [
      {
        _id: 0,
        name: "Sesamo",
        img_1: "/images/filter_images/Sesame.png",
        img_2: "/images/filter_images/Sesame_white.png",
      },
      {
        _id: 1,
        name: "Frutta a guscio",
        img_1: "/images/filter_images/Nut.png",
        img_2: "/images/filter_images/Nut_white.png",
      },
      {
        _id: 2,
        name: "Glutine",
        img_1: "/images/filter_images/Glutenfree.png",
        img_2: "/images/filter_images/Glutenfree_white.png",
      },
      {
        _id: 3,
        name: "Uova",
        img_1: "/images/filter_images/Egg.png",
        img_2: "/images/filter_images/Egg_white.png",
      },
      {
        _id: 4,
        name: "Soia",
        img_1: "/images/filter_images/Soy.png",
        img_2: "/images/filter_images/Soy_white.png",
      },
      {
        _id: 5,
        name: "Lattosio",
        img_1: "/images/filter_images/Milk.png",
        img_2: "/images/filter_images/Milk_white.png",
      },
      {
        _id: 6,
        name: "Arachidi",
        img_1: "/images/filter_images/Cashew.png",
        img_2: "/images/filter_images/Cashew_white.png",
      },
      {
        _id: 7,
        name: "Crostacei",
        img_1: "/images/filter_images/Shrimp.png",
        img_2: "/images/filter_images/Shrimp_white.png",
      },
      {
        _id: 8,
        name: "Vegano",
        img_1: "/images/filter_images/Vegan.png",
        img_2: "/images/filter_images/Vegan_white.png",
      },
      {
        _id: 9,
        name: "Vegetariano",
        img_1: "/images/filter_images/Vegetarian.png",
        img_2: "/images/filter_images/Vegetarian_white.png",
      },
    ],
    currents: [],
  },
  reducers: {
    setLabels: (state, { payload }) => {
      state.all = payload;
    },
    updateCurrentsLabel: (state, { payload }) => {
      const currentIndex = state.currents.findIndex(
        (item) => item._id == payload._id
      );
      if (currentIndex == -1) state.currents.push(payload);
      else state.currents.splice(currentIndex, 1);
    },
    resetCurrentsLabel: (state) => {
      state.currents = [];
    },
  },
});

export const { setLabels, updateCurrentsLabel, resetCurrentsLabel } = labelSlice.actions;

export default labelSlice.reducer;