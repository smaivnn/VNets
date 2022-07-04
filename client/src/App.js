import Layout from "./components/Layout";
import Register from "./components/Auth/Register";
import LoginForm from "./features/auth/LoginForm";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./features/auth/RequireAuth";
import Home from "./components/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostList from "./features/posts/PostsList";
import Posting from "./features/posts/Posting";
import PersistLogin from "./features/auth/PersistLogin";

const ROLES = {
  Guest: 2001,
  User: 1984,
  Admin: 5150,
};

function App() {
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
          <Route index element={<LoginForm />} />
          {/* <Route path=":userId" element={<UserPage />} /> */}
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
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
