import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { parseISO, sub } from "date-fns";
import axios from "../../api/axios";
const POSTS_URL = "post";
// "https://addce8e1-dac4-4afe-8fc0-82b0090acc95.mock.pstmn.io/post "/post";";
// "https://jsonplaceholder.typicode.com/posts";

// 최신순 정렬
const postAdapter = createEntityAdapter({
  selectId: (post) => post.POST_ID,
  sortComparer: (a, b) => b.DATE.localeCompare(a.DATE),
});

const initialState = postAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' |'succeeded' | 'failed'
  error: null,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data.response];
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    console.log(initialPost);
    try {
      const response = await axios.post(`${POSTS_URL}/create`, initialPost);

      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    const { POST_ID } = initialPost;
    try {
      const response = await axios.put(
        `${POSTS_URL}/edit/${POST_ID}`,
        initialPost
      );
      return response.data;
    } catch (err) {
      return err.message;
      // return initialPost; // only for testing Redux!
    }
  }
);

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
        let min = 1; // 분
        console.log("fetch", action.payload);
        const loadedPosts = action.payload.map((post) => {
          post.DATE = sub(parseISO(post.DATE), {}).toLocaleString();

          return post;
        });

        // Add any fetched posts to the array
        postAdapter.upsertMany(state, loadedPosts); //
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // action.payload.DATE = new Date().toISOString();

        console.log(action.payload);
        postAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        console.log(action.payload);
        if (!action.payload?.POST_ID) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        action.payload.DATE = sub(
          parseISO(action.payload.DATE),
          {}
        ).toLocaleString();

        // save to newest
        postAdapter.upsertOne(state, action.payload);
      });
  },
});

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPosts,
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
