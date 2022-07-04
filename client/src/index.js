import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { fetchPosts } from "./features/posts/postsSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { loginCheck } from "./features/auth/authSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
store.dispatch(loginCheck());
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
