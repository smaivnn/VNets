import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  current,
} from "@reduxjs/toolkit";
import axios from "../../api/axios";

const USERS_URL = "/login";

const initialState = {
  status: "idle", //'idle' | 'loading' |'succeeded' | 'failed'
  error: null,
  requireAuth: {
    accessToken: null,
    roles: { Guset: null, User: null, Admin: null },
  },
};

export const login = createAsyncThunk("auth/login", async (initialUser) => {
  //addNewPost(여기의 값들)이 넘어옴.(title, body, userId)
  try {
    const response = await axios.post(USERS_URL, initialUser, {
      withCredentials: true,
    });
    // console.log("response", response.data); // accesstoken값
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const authSlice = createSlice({
  name: "auth", // A name, used in action types
  initialState, // The initial state for the reducer
  reducers: {
    // 액션 타입은 슬라이스 이름을 접두어로 사용해서 자동 생성됩니다. -> 'posts/postAdded'
    // 이에 상응하는 액션 타입을 가진 액션이 디스패치 되면 리듀서가 실행됩니다.
    // login: (state, action) => {
    //   const { accessToken, roles } = action.payload;
    //   state.requireAuth.accessToken = accessToken;
    //   state.requireAuth.roles = roles;
    // },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      // console.log("STATE", state.status); //idle
      state.status = "succeeded";
      const { accessToken, roles } = action.payload;
      state.requireAuth.accessToken = accessToken;
      state.requireAuth.roles = roles;
      console.log("state.requireAuth", state.requireAuth.roles); //accesstoken 값
    });
  },
});

export const getUserAuth = (state) => state.auth.requireAuth;

// export const { login } = authSlice.actions;

export default authSlice.reducer;
