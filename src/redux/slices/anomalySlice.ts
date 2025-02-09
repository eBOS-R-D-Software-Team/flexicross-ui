import { createSlice, PayloadAction, Middleware } from '@reduxjs/toolkit';
import { DashboardData } from '../../interfaces/dashboardData';

// Utility function to load state from local storage
const loadStateFromLocalStorage = (): any[] => {
  try {
    const serializedState = localStorage.getItem('anomalyData');
    if (serializedState === null) {
      console.log("returning []");
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
    console.log("saving state with anomaly data: ", serializableState);
    localStorage.setItem('anomalyData', serializedState);
  } catch (err) {
    console.error('Could not save state to local storage', err);
  }
};

// Define the initial state structure
interface AnomalyDataState {
  anomalyData: any[];
  filteredData: any[];
  selectedAnomaly: any;
}

const initialState: AnomalyDataState = {
  anomalyData: loadStateFromLocalStorage(),
  filteredData: [],
  selectedAnomaly: null,
};

const anomalySlice = createSlice({
  name: 'anomalyData',
  initialState,
  reducers: {
    setAnomalyData: (state, action: PayloadAction<any[]>) => {
      state.anomalyData = action.payload;
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
      const foundData = state.anomalyData.find(data => data.id === action.payload);
      if (foundData) {
        state.selectedAnomaly = foundData;
      }
    },
    fetchAnomalies: (state, action: PayloadAction<any[]>) => {
      // Exclude the first element from the fetched anomalies
      state.anomalyData = action.payload;
      saveStateToLocalStorage(state.anomalyData); // Save fetched data to local storage

      console.log("anomaly data first returned :", state.anomalyData[0]);
    },
  },
});

export const {
  setAnomalyData,
  clearAnomalyData,
  deleteAnomalyDataById,
  updateAnomalyData,
  getAnomalyDataById,
  fetchAnomalies,
} = anomalySlice.actions;

// Thunk to fetch data from API
export const fetchAnomaliesFromAPI = () => async (dispatch: any) => {
  try {
    const postData = new URLSearchParams();
    postData.append('type', 'anomaly');  // Ensure 'type' has a value
    //postData.append('usecase','uc1_iccs');
    const response = await fetch('http://localhost:8080/api/UseCaseData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: postData.toString(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch anomalies');
    }
    const data = await response.json();
    dispatch(fetchAnomalies(data));
    await new Promise(resolve => setTimeout(resolve, 1000));
   // saveStateToLocalStorage(data); // Save fetched data to local storage
  } catch (err) {
    console.error('Failed to fetch anomalies:', err);
  }
};

// Middleware to handle saving state to local storage
const localStorageAnomalyMiddleware: Middleware = store => next => action => {
  const result = next(action);
  if (
    setAnomalyData.match(action) ||
    clearAnomalyData.match(action) ||
    deleteAnomalyDataById.match(action) ||
    updateAnomalyData.match(action) ||
    fetchAnomalies.match(action)

  ) {
    // console.log("store.getState().anomalyData.anomalyData.length: ", store.getState().anomalyData.anomalyData.length);
    // if(store.getState().anomalyData.anomalyData.length>0){
    // saveStateToLocalStorage(store.getState().anomalyData.anomalyData);}
  }
  return result;
};

export { localStorageAnomalyMiddleware };
export default anomalySlice.reducer;
