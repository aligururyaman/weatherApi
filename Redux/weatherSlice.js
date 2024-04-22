import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appId, hostName } from "../App/Utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const getCityData = createAsyncThunk('getCityData', async (obj) => {
    try {
        const response = await axios.get(`${hostName}/data/2.5/weather?q=${obj.city}&units=metric&appid=${appId}`);
        return response.data;
    } catch (error) {
        console.error("Specified City Not Found. Please Try Again", error);
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

export const loadRecordedCities = createAsyncThunk('weather/loadRecordedCities', async () => {
    const savedCities = await AsyncStorage.getItem('recordedCities');
    return savedCities ? JSON.parse(savedCities) : [];
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
                const newRecordedCities = [...state.recordedCities, action.payload];
                state.recordedCities = newRecordedCities;
                AsyncStorage.setItem('recordedCities', JSON.stringify(newRecordedCities));
            }
        },
        removeRecordedCity(state, action) {
            const newRecordedCities = state.recordedCities.filter(city => city !== action.payload);
            state.recordedCities = newRecordedCities;
            AsyncStorage.setItem('recordedCities', JSON.stringify(newRecordedCities));
        },
        setRecordedCities(state, action) {
            state.recordedCities = action.payload;
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
            .addCase(loadRecordedCities.fulfilled, (state, action) => {
                state.recordedCities = action.payload;
            });
    }
});


export const { addRecordedCity, removeRecordedCity,setRecordedCities } = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
