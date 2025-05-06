import { createSlice, PayloadAction, Middleware } from '@reduxjs/toolkit';


console.log("production: ", process.env.REACT_APP_PRODUCTION);
const isProd = process.env.REACT_APP_PRODUCTION == 'true';  // make sure your env var is literally "true"
const isNetlify = process.env.REACT_APP_NETLIFY == 'true';  // make sure your env var is literally "true"

// choose the base for all your calls
const API_BASE = isNetlify
  // in prod your Netlify redirects will proxy /api → http://172.16.11.12:8080/api
  ? '/api'
  // in local/dev go directly to your backend
  : 'http://172.16.11.12:8080/api';


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
  filteredData: any[];
  selectedDetection: any;
}

const initialState: DetectionDataState = {
  detectionData: loadStateFromLocalStorage(),
  filteredData: [],
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
    setFilteredDetectionData: (state, action: PayloadAction<any[]>) => {
      state.filteredData = action.payload;
    //  saveStateToLocalStorage(state.filteredData); 
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
  setFilteredDetectionData
} = detectionSlice.actions;

// Thunk to fetch data from API
export const fetchDetectionsFromAPI = () => async (dispatch: any) => {
  try {

    //https://slimrelief.pythonanywhere.com/api/UseCaseData
    //http://172.16.11.12:8080/api/UseCaseData
    const postData = new URLSearchParams();
    postData.append('type', 'detection');  // Ensure 'type' has a value
    const usergroup = localStorage.getItem("usergroup") || 'uc1_iccs';

    postData.append('usecase',usergroup);

    const response = await fetch(`api/UseCaseData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: postData.toString(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch detections');
    }
    const raw = await response.json();
    console.log('received detection response:', raw);

    // unwrap for prod, else use the body directly
    const payload = isProd ? raw.documents : raw;

    dispatch(fetchDetections(payload));
    saveStateToLocalStorage(payload); // Save fetched data to local storage
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
    updateDetectionData.match(action) || 
    setFilteredDetectionData.match(action)

  ) {
  //  saveStateToLocalStorage(store.getState().detectionData.detectionData);
  }
  return result;
};

export { localStorageDetectionMiddleware };
export default detectionSlice.reducer;