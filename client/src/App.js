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

  /*
  현재 문제점 :
Layout 컴포넌트에서 리덕스에 저장된 스토어 상태가 success일때에 따라 보이게 하고싶은데,

 <div className="inline-block w-[350px] float-right">
            {
              LogedInState ? <div>successs</div> : <Auth />

              // 컴포넌트 로딩이 느림.(AUTH가 디폴트로 되어있고, state가 ture여도 auth임.
              // 그러다가 추후에 바뀜.)
            }

페이지 새로고침 시 리덕스 스토어에 lodedIn이 바뀌는게
layout이 렌더링 되는것보다 늦는것 같음 그래서인지 div가 안나옴.
useEffect, store.dispatch 등의 방법을 적용해보았으나 다 실패

  */

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
