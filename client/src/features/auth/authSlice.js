import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  current,
} from "@reduxjs/toolkit";
import axios from "../../api/axios";

const LOGIN_URL = "/auth/login";
const LOGIN_CHECK_URL = "/auth/loginCheck";
const TOKEN_REFRESH_URL = "";

const initialState = {
  status: "idle", //'idle' | 'loading' |'succeeded' | 'failed'
  logedIn: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (initialUser) => {
  try {
    const response = await axios.post(LOGIN_URL, initialUser, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    const accessToken = response?.data?.accessToken;
    // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    console.log("SLICE accessToken", accessToken); // accesstoken값

    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const loginCheck = createAsyncThunk("auth/loginCheck", async () => {
  try {
    const response = await axios.get(
      LOGIN_CHECK_URL,
      {},
      {
        withCredentials: true, // req에 쿠키를 보내는걸 allow해줌.
      }
    );
    console.log("loginCheck", response.data);

    return [...response.data];
  } catch (err) {
    return err.message;
  }
});

export const silentRefresh = createAsyncThunk(
  "auth/tokenRefresh",
  async (accessToken) => {
    try {
      const response = await axios.post(TOKEN_REFRESH_URL, accessToken);
    } catch (err) {}
  }
);

const authSlice = createSlice({
  name: "auth", // A name, used in action types
  initialState, // The initial state for the reducer
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        // console.log("STATE", state.status); //idle
        state.status = "succeeded";
        const { accessToken } = action.payload;
        state.accesstoken = accessToken;
        state.logedIn = true;
        console.log("state.AT", state.accessToken); //accesstoken 값
      })
      .addCase(loginCheck.fulfilled, (state, action) => {
        console.log("pay", action.payload);
        state.loginCheck = action.payload.login;
      });
  },
});

export const getUserAuth = (state) => state.auth.requireAuth;

// export const { login } = authSlice.actions;

export default authSlice.reducer;
