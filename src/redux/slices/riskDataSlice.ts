import { createSlice, PayloadAction, Middleware } from '@reduxjs/toolkit';
import { DashboardData } from '../../interfaces/dashboardData';

// Utility function to load state from local storage
const loadStateFromLocalStorage = (): DashboardData[] => {
  try {
    const serializedState = localStorage.getItem('dashboardData');
    console.log(serializedState);
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState) as DashboardData[];
  } catch (err) {
    console.error('Could not load state from local storage', err);
    return [];
  }
};

// Utility function to save state to local storage
const saveStateToLocalStorage = (state: DashboardData[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('dashboardData', serializedState);
  } catch (err) {
    console.error('Could not save state to local storage', err);
  }
};

interface DashboardDataState {
  dashboardData: DashboardData[];
}

const initialState: DashboardDataState = {
  dashboardData: loadStateFromLocalStorage(),
};

const dashboardDataSlice = createSlice({
  name: 'dashboardData',
  initialState,
  reducers: {
    setDashboardData: (state, action: PayloadAction<DashboardData>) => {
      state.dashboardData.push(action.payload);
    },
    clearDashboardData: (state) => {
      state.dashboardData = [];
    },
  },
});

export const { setDashboardData, clearDashboardData } = dashboardDataSlice.actions;

// Middleware to handle saving state to local storage
const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);
  if (setDashboardData.match(action) || clearDashboardData.match(action)) {
    saveStateToLocalStorage(store.getState().dashboardData.dashboardData);
  }
  return result;
};

export { localStorageMiddleware };

export default dashboardDataSlice.reducer;
