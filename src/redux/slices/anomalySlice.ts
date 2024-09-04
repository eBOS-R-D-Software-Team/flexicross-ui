import { createSlice, PayloadAction, Middleware } from '@reduxjs/toolkit';
import {  DashboardData } from '../../interfaces/dashboardData';
import { anomalyDummy } from './data/anomalydummy';

// Utility function to load state from local storage
const loadStateFromLocalStorage = (): any[] => {
  try {
    const serializedState = localStorage.getItem('anomalyData');
    if (serializedState === null) {
      saveStateToLocalStorage(anomalyDummy);
      return anomalyDummy;
    }
    const state = JSON.parse(serializedState) as DashboardData[];
    return state.map(item => ({
      ...item,
      datetime: (item.datetime),
    }));
  } catch (err) {
    console.error('Could not load state from local storage', err);
    return [];
  }
};

// Utility function to save state to local storage
const saveStateToLocalStorage = (state: any[]) => {
  try {
    const serializableState = state.map(item => ({
      ...item,
      datetime: item.datetime instanceof Date ? item.datetime.toISOString() : item.datetime,
    }));
    const serializedState = JSON.stringify(serializableState);
    localStorage.setItem('anomalyData', serializedState);
  } catch (err) {
    console.error('Could not save state to local storage', err);
  }
};

// Define the initial state structure
interface AnomalyDataState {
  anomalyData: any[];
  filteredData: any[] ;
  selectedAnomaly: any;
}

const initialState: AnomalyDataState = {
  anomalyData: loadStateFromLocalStorage(),
  filteredData: [],
  selectedAnomaly: null
};

const anomalySlice = createSlice({
  name: 'anomalyData',
  initialState,
  reducers: {
    setAnomalyData: (state, action: PayloadAction<any[]>) => {
      state.anomalyData=(action.payload);
    },
    clearAnomalyData: (state) => {
      state.anomalyData = loadStateFromLocalStorage();
    },
    deleteAnomalyDataById: (state, action: PayloadAction<string>) => {
      state.anomalyData = state.anomalyData.filter(data => data.id !== action.payload);
    },
    updateAnomalyData: (state, action: PayloadAction<any>) => {
      const index = state.anomalyData.findIndex(data => data.id === action.payload.id);
      if (index !== -1) {
        state.anomalyData[index] = {
          ...action.payload,
          datetime: action.payload.datetime instanceof Date
            ? action.payload.datetime.toISOString()
            : action.payload.datetime,
        };
      }
    },
    getAnomalyDataById: (state, action: PayloadAction<any>) => {
      const foundData = anomalyDummy.find(data => data.id === action.payload);
      if (foundData) {
        state.selectedAnomaly = foundData;
      }
    },
  },
});

export const {
  setAnomalyData,
  clearAnomalyData,
  deleteAnomalyDataById,
  updateAnomalyData,
  getAnomalyDataById,
} = anomalySlice.actions;

// Middleware to handle saving state to local storage
const localStorageAnomalyMiddleware: Middleware = store => next => action => {
  const result = next(action);
  if (
    setAnomalyData.match(action) ||
    clearAnomalyData.match(action) ||
    deleteAnomalyDataById.match(action) ||
    updateAnomalyData.match(action)
  ) {
    saveStateToLocalStorage(store.getState().anomalyData.anomalyData);
  }
  return result;
};

export { localStorageAnomalyMiddleware };
export default anomalySlice.reducer;
