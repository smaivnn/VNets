import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Auth from "../features/auth/Auth";
import TopPost from "./Post/TopPost";
import { store } from "../app/store";
// h-auto min-h-full pb-[420px]
const Layout = () => {
  const [LogedInState, setLogedInState] = useState(
    store.getState().auth.logedIn
  );
  console.log("Layout입니다.");

  useEffect(() => {
    console.log("store", store.getState().auth);
  });

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
            {
              LogedInState ? <div>successs</div> : <Auth />

              // 컴포넌트 로딩이 느림.(AUTH가 디폴트로 되어있고, state가 ture여도 auth임.
              // 그러다가 추후에 바뀜.)
            }
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
