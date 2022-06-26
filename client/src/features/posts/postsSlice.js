import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const POSTS_URL =
  "https://addce8e1-dac4-4afe-8fc0-82b0090acc95.mock.pstmn.io/post";

// 최신순 정렬
const postAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.DATE.localeCompare(a.DATE),
});

const initialState = postAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' |'succeeded' | 'failed'
  error: null,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (err) {
    return err.message;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions

        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.DATE = sub(new Date(), { minutes: min++ }).toISOString();

          return post;
        });

        // Add any fetched posts to the array
        postAdapter.upsertMany(state, loadedPosts); //
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postAdapter.getSelectors((state) => state.posts);

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

// 이 전이랑 상태가 같으면 render X,
export const selectPostsbyUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export default postsSlice.reducer;
