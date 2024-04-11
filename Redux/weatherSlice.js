import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appId, hostName } from "../App/Utils/config";


export const getCityData = createAsyncThunk('getCityData', async (obj) => {
    try {
        const response = await axios.get(`${hostName}/data/2.5/weather?q=${obj.city}&units=metric&appid=${appId}`);
        return response.data;
    } catch (error) {
        console.error("haa burda", error);
    }
});

export const get5Days = createAsyncThunk('get5Days', async (obj) => {
    const response = await axios.get(`${hostName}/data/2.5/forecast?lat=${obj.lat}&lon=${obj.lon}&units=metric&appid=${appId}`);
    return response.data;
});

export const getAir = createAsyncThunk('getAir', async (obj) => {
    const response = await axios.get(`${hostName}/data/2.5/air_pollution?lat=${obj.lat}&lon=${obj.lon}&appid=${appId}`);
    return response.data
});

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        citySearchLoading: false,
        citySearchData: null,
        forecastLoading: false,
        forecastData: null,
        forecastError: null,
        recordedCities: [],
        airPollutionData: null,
        airPollutionLoading: false
    },
    reducers: {
        addRecordedCity(state, action) {
            if (!state.recordedCities.includes(action.payload)) {
                state.recordedCities.push(action.payload);
            }
        },
        removeRecordedCity(state, action) {
            state.recordedCities = state.recordedCities.filter(city => city !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCityData.pending, (state) => {
                state.citySearchLoading = true;
                state.citySearchData = null;
            })
            .addCase(getCityData.fulfilled, (state, action) => {
                state.citySearchLoading = false;
                state.citySearchData = action.payload;
            })
            .addCase(get5Days.pending, (state) => {
                state.forecastLoading = true;
                state.forecastData = null;
                state.forecastError = null;
            })
            .addCase(get5Days.fulfilled, (state, action) => {
                state.forecastLoading = false;
                state.forecastData = action.payload;
                state.forecastError = null;
            })
            .addCase(get5Days.rejected, (state, action) => {
                state.forecastLoading = false;
                state.forecastData = null;
                state.forecastError = action.error.message;
            })
            .addCase(getAir.pending, (state) => {
                state.airPollutionLoading = true;
                state.airPollutionData = null;
            })
            .addCase(getAir.fulfilled, (state, action) => {
                state.airPollutionLoading = false;
                state.airPollutionData = action.payload;
            })
    }
});


export const { addRecordedCity, removeRecordedCity } = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
