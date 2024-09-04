import { createSlice, PayloadAction, Middleware } from '@reduxjs/toolkit';
import { detectionDummy } from './data/dummyDetections';

// Utility function to load state from local storage
const loadStateFromLocalStorage = (): any[] => {
  try {
    const serializedState = localStorage.getItem('detectionData');
    if (serializedState === null) {
      saveStateToLocalStorage(detectionDummy);
      return detectionDummy;
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
      const foundData = detectionDummy.find(data => data.id === action.payload);
        state.selectedDetection = foundData;
      
    },
  },
});

export const {
  setDetectionData,
  clearDetectionData,
  deleteDetectionDataById,
  updateDetectionData,
  getDetectionDataById,
} = detectionSlice.actions;

// Middleware to handle saving state to local storage
const localStorageDetectionMiddleware: Middleware = store => next => action => {
  const result = next(action);
  if (
    setDetectionData.match(action) ||
    clearDetectionData.match(action) ||
    deleteDetectionDataById.match(action) ||
    updateDetectionData.match(action)
  ) {
    saveStateToLocalStorage(store.getState().detectionData.detectionData);
  }
  return result;
};

export { localStorageDetectionMiddleware };
export default detectionSlice.reducer;
