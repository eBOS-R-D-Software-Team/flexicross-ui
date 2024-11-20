import { createSlice, PayloadAction, Middleware } from '@reduxjs/toolkit';

// Utility function to load state from local storage
const loadStateFromLocalStorage = (): any[] => {
  try {
    const serializedState = localStorage.getItem('detectionData');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state from local storage', err);
    return [];
  }
};

// Utility function to save state to local storage
const saveStateToLocalStorage = (state: any[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('detectionData', serializedState);
  } catch (err) {
    console.error('Could not save state to local storage', err);
  }
};

// Define the initial state structure
interface DetectionDataState {
  detectionData: any[];
  selectedDetection: any;
}

const initialState: DetectionDataState = {
  detectionData: loadStateFromLocalStorage(),
  selectedDetection: null,
};

const detectionSlice = createSlice({
  name: 'detectionData',
  initialState,
  reducers: {
    setDetectionData: (state, action: PayloadAction<any[]>) => {
      state.detectionData = action.payload;
    },
    clearDetectionData: (state) => {
      state.detectionData = loadStateFromLocalStorage();
    },
    deleteDetectionDataById: (state, action: PayloadAction<string>) => {
      state.detectionData = state.detectionData.filter(data => data.id !== action.payload);
    },
    updateDetectionData: (state, action: PayloadAction<any>) => {
      const index = state.detectionData.findIndex(data => data.id === action.payload.id);
      if (index !== -1) {
        state.detectionData[index] = {
          ...action.payload,
          datetime: action.payload.datetime instanceof Date
            ? action.payload.datetime.toISOString()
            : action.payload.datetime,
        };
      }
    },
    getDetectionDataById: (state, action: PayloadAction<any>) => {
      const foundData = state.detectionData.find(data => data.id === action.payload);
      state.selectedDetection = foundData;
    },
    fetchDetections: (state, action: PayloadAction<any[]>) => {
      // Exclude the first element from the fetched detections
      state.detectionData = action.payload;
    },
  },
});

export const {
  setDetectionData,
  clearDetectionData,
  deleteDetectionDataById,
  updateDetectionData,
  getDetectionDataById,
  fetchDetections,
} = detectionSlice.actions;

// Thunk to fetch data from API
export const fetchDetectionsFromAPI = () => async (dispatch: any) => {
  try {
    const postData = new URLSearchParams();
    postData.append('type', 'detection');  // Ensure 'type' has a value
    const response = await fetch('http://localhost:8080/api/UseCaseData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: postData.toString(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch detections');
    }
    const data = await response.json();
    dispatch(fetchDetections(data));
    saveStateToLocalStorage(data); // Save fetched data to local storage
  } catch (err) {
    console.error('Failed to fetch detections:', err);
  }
};

// Middleware to handle saving state to local storage
const localStorageDetectionMiddleware: Middleware = store => next => action => {
  const result = next(action);
  if (
    setDetectionData.match(action) ||
    clearDetectionData.match(action) ||
    deleteDetectionDataById.match(action) ||
    updateDetectionData.match(action)
  ) {
  //  saveStateToLocalStorage(store.getState().detectionData.detectionData);
  }
  return result;
};

export { localStorageDetectionMiddleware };
export default detectionSlice.reducer;