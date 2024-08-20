import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';


import dashboardDataReducer, { localStorageMiddleware } from './slices/riskDataSlice';


const store = configureStore({
  reducer: {
    dashboardData: dashboardDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
