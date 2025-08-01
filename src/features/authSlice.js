
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: null,
    token: null,
    loading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state) {
            state.user = null;
            state.token = null;
        },
        setAuthLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setUser, logout, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;


