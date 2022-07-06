import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Register from "./components/Auth/Register";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./features/auth/RequireAuth";
import Home from "./components/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostList from "./features/posts/PostsList";
import Posting from "./features/posts/Posting";
import Auth from "./features/auth/Auth";
import PersistLogin from "./features/auth/PersistLogin";
import { loginCheck } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import { store } from "./app/store";

const ROLES = {
  Guest: 2001,
  User: 1984,
  Admin: 5150,
};

function App() {
  // const dispatch = useDispatch();
  // console.log(store.getState().auth.logedIn);
  // useEffect(() => {
  //   //   //새로고침시 실행.

  //   dispatch(loginCheck()).unwrap();
  //   console.log("실행됨");
  // }, [store.getState().auth.logedIn]);

  return (
    <Routes>
      {/* <Route element={<PersistLogin />}> */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="board">
          <Route path="notice" element={<PostList />} />
          <Route path="create" element={<Posting />} />
        </Route>

        <Route path="auth">
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="register">
          <Route index element={<Register />} />
          {/* <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} /> */}
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />

        <Route path="login">
          <Route index element={<Auth />} />
          {/* <Route path=":userId" element={<UserPage />} /> */}
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      {/* </Route> */}
    </Routes>
  );
}

export default App;

{
  /* <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <p className="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
      <p className="text-gray-500 text-lg">React and Tailwind CSS in action</p>
</div> */
}
