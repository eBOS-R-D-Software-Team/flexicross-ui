import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCaseStudies,  } from './../../services/geoplanetService';
import { CaseStudies } from '../../interfaces';

interface CaseStudiesState {
    data: CaseStudies[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    selectedCaseStudy: CaseStudies | null;
}

const initialState: CaseStudiesState = {
    data: [],
    status: 'idle',
    error: null,
    selectedCaseStudy: null,
};

export const getCaseStudies = createAsyncThunk('caseStudies/getCaseStudies', async () => {
    const data = await fetchCaseStudies();
    return data;
});

const caseStudiesSlice = createSlice({
    name: 'caseStudies',
    initialState,
    reducers: {
        selectCaseStudy(state, action: PayloadAction<CaseStudies>) {
            state.selectedCaseStudy = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCaseStudies.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getCaseStudies.fulfilled, (state, action: PayloadAction<CaseStudies[]>) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(getCaseStudies.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch case studies';
        });
    },
});

export const { selectCaseStudy } = caseStudiesSlice.actions;

export default caseStudiesSlice.reducer;
