import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggleLoading } from "../loader/loaderSlice";
import { RootState } from "../store";

interface CounterState {
  value: number;
  loadingCount: boolean;
}

const initialState: CounterState = {
  value: 0,
  loadingCount: false,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increament: (state) => {
      state.value += 1;
    },
    decreament: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(increamentAsync.pending, (state) => {
        state.loadingCount = !state.loadingCount;
      })
      .addCase(increamentAsync.fulfilled, (state, action) => {
        toggleLoading(false);
        state.value += action.payload;
        state.loadingCount = !state.loadingCount;
      });
  },
});

export const increamentAsync = createAsyncThunk(
  "counter/increamentAsync",
  async (max: number, { getState, dispatch }) => {
    dispatch(toggleLoading(!(getState() as RootState).loader.isLoading));
    await new Promise((resolve) => setTimeout(resolve, 5000));
    dispatch(toggleLoading(!(getState() as RootState).loader.isLoading));
    return Math.floor(Math.random() * max);
  }
);

export const { increament, decreament } = counterSlice.actions;
export default counterSlice.reducer;
