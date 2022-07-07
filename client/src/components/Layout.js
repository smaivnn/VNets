import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Auth from "../features/auth/Auth";
import TopPost from "./Post/TopPost";
import { store } from "../app/store";
import { useSelector } from "react-redux";
import { getAuthLogedIn } from "../features/auth/authSlice";
// h-auto min-h-full pb-[420px]
const Layout = () => {
  const logedInState = useSelector(getAuthLogedIn);
  const [AuthState, setAuthState] = useState(logedInState);

  useEffect(() => {
    setAuthState(logedInState);
  }, [logedInState]);

  return (
    <>
      <Header />
      <Nav />
      <main
        id="container"
        className="App relative w-[1190px] mx-auto my-10 overflow-hidden"
      >
        <section className="relative w-full mx-auto ">
          <div className="inline-block w-[750px] float-left">
            <Outlet />
          </div>
          <div className="inline-block w-[350px] float-right">
            {AuthState ? <div>success</div> : <Auth />}

            <TopPost />
          </div>
        </section>
      </main>
      <hr />
      <Footer />
    </>
  );
};

export default Layout;
