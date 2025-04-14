import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';


import dashboardDataReducer, { localStorageMiddleware } from './slices/riskDataSlice';
import anomalySlice, { localStorageAnomalyMiddleware } from './slices/anomalySlice';
import detectionSlice, { localStorageDetectionMiddleware } from './slices/detectionSlice';


const store = configureStore({
  reducer: {
    dashboardData: dashboardDataReducer,
    anomalyData: anomalySlice,
    detectionData: detectionSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware).concat(localStorageAnomalyMiddleware).concat(localStorageDetectionMiddleware),
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
