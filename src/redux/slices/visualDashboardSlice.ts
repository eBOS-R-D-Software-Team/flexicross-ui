/* ------------------------------------------------------------------ */
/*  visualDashboardSlice.ts                                           */
/*  – identical “look & feel” to your anomalySlice implementation     */
/* ------------------------------------------------------------------ */

import { createSlice, PayloadAction, Middleware } from '@reduxjs/toolkit';
import dayjs from 'dayjs';                // optional—just for date formatting

/* ---------- Types -------------------------------------------------- */

export interface VisualDashboard {
  id: string;
  datetime: string;            // ISO string (or whatever you prefer)
  data: any[];                 // anomalies + detections at creation time
  filters: Record<string, any>;
}

interface VisualDashboardsState {
  dashboards: VisualDashboard[];
}

/* ---------- Local-storage helpers --------------------------------- */

const LS_KEY = 'visualDashboards';

/* read */
const loadStateFromLocalStorage = (): VisualDashboard[] => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];

    /* nothing to deserialise except the array itself */
    return JSON.parse(raw) as VisualDashboard[];
  } catch (err) {
    console.error('[visual dashboards] Could not load from LS:', err);
    return [];
  }
};

/* write */
const saveStateToLocalStorage = (dashboards: VisualDashboard[]) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(dashboards));
  } catch (err) {
    console.error('[visual dashboards] Could not save to LS:', err);
  }
};

/* ---------- Slice -------------------------------------------------- */

const initialState: VisualDashboardsState = {
  dashboards: loadStateFromLocalStorage(),
};

const visualDashboardSlice = createSlice({
  name: 'visualDashboardData',
  initialState,
  reducers: {
    addVisualDashboard: (state, action: PayloadAction<VisualDashboard>) => {
      state.dashboards.push(action.payload);
    },
    removeVisualDashboard: (state, action: PayloadAction<string>) => {
      state.dashboards = state.dashboards.filter(
        d => d.id !== action.payload,
      );
    },
    clearVisualDashboards: state => {
      state.dashboards = [];
    },
    /* optional: update an existing dashboard (e.g. rename, add notes) */
    updateVisualDashboard: (
      state,
      action: PayloadAction<VisualDashboard>,
    ) => {
      const idx = state.dashboards.findIndex(
        d => d.id === action.payload.id,
      );
      if (idx !== -1) state.dashboards[idx] = action.payload;
    },
  },
});

export const {
  addVisualDashboard,
  removeVisualDashboard,
  clearVisualDashboards,
  updateVisualDashboard,
} = visualDashboardSlice.actions;

export default visualDashboardSlice.reducer;

/* ---------- Middleware (persist after mutating actions) ------------ */

const localStorageVisualMiddleware: Middleware =
  store => next => action => {
    const result = next(action);

    if (
      addVisualDashboard.match(action) ||
      removeVisualDashboard.match(action) ||
      clearVisualDashboards.match(action) ||
      updateVisualDashboard.match(action)
    ) {
      const { dashboards } =
        store.getState().visualDashboardData as VisualDashboardsState;
      saveStateToLocalStorage(dashboards);
    }

    return result;
  };

export { localStorageVisualMiddleware };
