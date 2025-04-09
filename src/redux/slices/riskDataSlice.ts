import { createSlice, PayloadAction, Middleware } from '@reduxjs/toolkit';
import { DashboardData } from '../../interfaces/dashboardData';
import { dummyData } from '../../dummyData';

// Utility function to load state from local storage
const loadStateFromLocalStorage = (): DashboardData[] => {
  try {
    const serializedState = localStorage.getItem('dashboardData');
    if (serializedState === null) {
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
const saveStateToLocalStorage = (state: DashboardData[]) => {
  try {
    const serializableState = state.map(item => ({
      ...item,
      datetime: item.datetime instanceof Date ? item.datetime.toISOString() : item.datetime,
    }));
    const serializedState = JSON.stringify(serializableState);
    localStorage.setItem('dashboardData', serializedState);
  } catch (err) {
    console.error('Could not save state to local storage', err);
  }
};

// Define the initial state structure
interface DashboardDataState {
  dashboardData: DashboardData[];
  selectedDashboard: any;
  selectedRisk:any;
}

const initialState: DashboardDataState = {
  dashboardData: loadStateFromLocalStorage(),
  selectedDashboard: null,
  selectedRisk: null
};

const dashboardDataSlice = createSlice({
  name: 'dashboardData',
  initialState,
  reducers: {
    setDashboardData: (state, action: PayloadAction<DashboardData>) => {
      const data = {
        ...action.payload,
        datetime: action.payload.datetime instanceof Date
          ? action.payload.datetime.toISOString()
          : action.payload.datetime,
      };
      state.dashboardData.push(data);
    },
    clearDashboardData: (state) => {
      state.dashboardData = [];
    },
    deleteDashboardDataById: (state, action: PayloadAction<string>) => {
      state.dashboardData = state.dashboardData.filter(data => data.id !== action.payload);
    },
    updateDashboardData: (state, action: PayloadAction<DashboardData>) => {
      const index = state.dashboardData.findIndex(data => data.id === action.payload.id);
      if (index !== -1) {
        state.dashboardData[index] = {
          ...action.payload,
          datetime: action.payload.datetime instanceof Date
            ? action.payload.datetime.toISOString()
            : action.payload.datetime,
        };
      }
    },
    getDashboardDataById: (state, action: PayloadAction<any>) => {
      // This reducer will be used to fetch data by id.
      // However, typically you do not change the state in a getter, so return type is void.
      const tempData = state.dashboardData.find(data => data.id === action.payload)
      const data = {
        ...tempData,
        datetime: '',
      };
       state.selectedDashboard=data;
      //  return state.selectedDashboard;
    },
    getRiskById: (state, action: PayloadAction<any>) => {
      console.log(dummyData,action.payload);
      const foundData = dummyData.find(data => data.id === action.payload);
        state.selectedRisk = foundData;
        console.log(foundData,action.payload);
    },
    fetchRisks: (state, action: PayloadAction<any[]>) => {
      // Exclude the first element from the fetched anomalies
      state.dashboardData = action.payload;
      saveStateToLocalStorage(state.dashboardData); // Save fetched data to local storage

      console.log("risks data first returned :", state.dashboardData[0]);
    },
  },
});

export const {
  setDashboardData,
  clearDashboardData,
  deleteDashboardDataById,
  updateDashboardData,
  getDashboardDataById,
  getRiskById,
  fetchRisks
} = dashboardDataSlice.actions;

// Thunk to fetch data from API
export const fetchRisksFromAPI = () => async (dispatch: any) => {
  try {
    const postData = new URLSearchParams();
    postData.append('type', 'risk');  // Ensure 'type' has a value
    postData.append('usecase','uc2_wings');
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
    dispatch(fetchRisks(data));
    await new Promise(resolve => setTimeout(resolve, 1000));
   // saveStateToLocalStorage(data); // Save fetched data to local storage
  } catch (err) {
    console.error('Failed to fetch anomalies:', err);
  }
};
// Middleware to handle saving state to local storage
const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);
  if (
    setDashboardData.match(action) ||
    clearDashboardData.match(action) ||
    deleteDashboardDataById.match(action) ||
    updateDashboardData.match(action) ||
    fetchRisks.match(action)
  ) {
    saveStateToLocalStorage(store.getState().dashboardData.dashboardData);
  }
  return result;
};

export { localStorageMiddleware };
export default dashboardDataSlice.reducer;
