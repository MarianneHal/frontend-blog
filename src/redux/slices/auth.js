import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";


const initialState = {
    data: null,
    status: 'loading'
};

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
    const { data } = await instance.post('/auth/login', params)
    return data
})

export const fetchAuthMe = createAsyncThunk('auth/authMe', async () => {
    const { data } = await instance.get('/auth/me')
    return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await instance.post('/auth/register', params)
    return data
})



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logAut: (state, action) => {
            state.data = null;
            state.status = 'loaded'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            });
        builder
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            });
        builder
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            });
    }
})
export const selectIsAuth = state => Boolean(state.auth.data)
export const authReducer = authSlice.reducer
export const { logAut } = authSlice.actions