import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  current,
} from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
    const decoded = response?.data?.accessToken
      ? jwt_decode(accessToken)
      : undefined;

    console.log(decoded);
    // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        USER_ID: decoded.UserInfo.USER_ID,
        USER_NICKNAME: decoded.UserInfo.USER_NICKNAME,
        USER_studentID: decoded.UserInfo.USER_studentID,
        USER_ROLE: decoded.UserInfo.roles,
        accessToken: accessToken,
      })
    );

    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const loginCheck = createAsyncThunk("auth/loginCheck", async () => {
  // const axiosPrivate = useAxiosPrivate();)
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  try {
    const response = await axios.get(LOGIN_CHECK_URL, {
      headers: { Authorization: `Bearer ${userInfo.accessToken}` },
    });

    return response.data;
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
        //injected등 상태 다 만들어주기.
        // console.log("STATE", state.status); //idle
        state.status = "succeeded";
        const { accessToken } = action.payload;
        const decoded = accessToken ? jwt_decode(accessToken) : undefined;

        state.logedIn = true;
        state.accessToken = accessToken;
        state.userInfo = {
          USER_ID: decoded.UserInfo.USER_ID,
          USER_NICKNAME: decoded.UserInfo.USER_NICKNAME,
          USER_studentID: decoded.UserInfo.USER_studentID,
          USER_ROLE: decoded.UserInfo.roles,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.logedIn = false;
        state.error = action.error.message;
      })

      .addCase(loginCheck.fulfilled, (state, action) => {
        if (action.payload.login === "success") {
          state.status = "succeeded";
          const { accessToken } = action.payload;
          const decoded = accessToken ? jwt_decode(accessToken) : undefined;

          state.logedIn = true;
          state.accessToken = accessToken;
          state.userInfo = {
            USER_ID: decoded.UserInfo.USER_ID,
            USER_NICKNAME: decoded.UserInfo.USER_NICKNAME,
            USER_studentID: decoded.UserInfo.USER_studentID,
            USER_ROLE: decoded.UserInfo.roles,
          };
        }
      });
  },
});

export const getUserAuth = (state) => state.auth.requireAuth;
export const getAuthStatus = (state) => state.auth.status;
export const getAuthLogedIn = (state) => state.auth.logedIn;
export const getUserInfo = (state) => state.auth.userInfo;

// export const { login } = authSlice.actions;

export default authSlice.reducer;
