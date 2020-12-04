import { createSlice } from "@reduxjs/toolkit";

const savedReposSlice = createSlice({
  name: "savedRepos",
  initialState: [],
  reducers: {
    setSavedRepos: (state, { payload }) => payload,
    addToSavedRepos: (state, { payload: repo }) => {
      const objRepo = state.slice(0);
      objRepo.push(repo);

      return objRepo;
    },
    updateSavedRepos: (state, { payload }) => {
      const { index, repo } = payload;
      const objRepo = state.slice(0);
      objRepo.splice(index, 1, repo);

      return objRepo;
    },
    removeFromSavedRepos: (state, { payload: repo }) => {
      const objRepo = state.slice(0);

      return objRepo.reduce((accumulator, currentValue) => {
        if (currentValue.key !== repo.key) accumulator.push(currentValue);

        return accumulator;
      }, []);
    },
  },
});

const { actions, reducer } = savedReposSlice;

export const {
  setSavedRepos,
  addToSavedRepos,
  updateSavedRepos,
  removeFromSavedRepos,
} = actions;
export default reducer;
