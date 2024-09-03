import { createSlice, PayloadAction, Middleware } from '@reduxjs/toolkit';
import {  DashboardData } from '../../interfaces/dashboardData';
import { anomalyDummy } from '../../components/pages/anomalydummy';

// Utility function to load state from local storage
const loadStateFromLocalStorage = (): any[] => {
  try {
    const serializedState = localStorage.getItem('anomalyData');
    if (serializedState === null) {
      saveStateToLocalStorage(anomalyDummy);
      return [];
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
}

const initialState: AnomalyDataState = {
  anomalyData: loadStateFromLocalStorage(),
  filteredData: [],
};

const anomalySlice = createSlice({
  name: 'anomalyData',
  initialState,
  reducers: {
    setAnomalyData: (state, action: PayloadAction<any[]>) => {
      state.anomalyData=(action.payload);
    },
    clearAnomalyData: (state) => {
      state.anomalyData = [];
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
      // This reducer will be used to fetch data by id.
      // However, typically you do not change the state in a getter, so return type is void.
      const tempData = state.anomalyData.find(data => data.id === action.payload)
      const data = {
        ...tempData,
        datetime: '',
      };
       state.anomalyData=data;
      //  return state.selectedDashboard;
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
    saveStateToLocalStorage(store.getState().dashboardData.dashboardData);
  }
  return result;
};

export { localStorageAnomalyMiddleware };
export default anomalySlice.reducer;
