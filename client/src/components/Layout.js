import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Auth from "./Auth/Auth";
import TopPost from "./Post/TopPost";

// h-auto min-h-full pb-[420px]
const Layout = () => {
  return (
    <>
      <Header />
      <Nav />
      <main
        id="container"
        className="App relative w-[1190px] mx-auto my-10 overflow-hidden"
      >
        <div>
          <Outlet />
        </div>
        <div className="inline-block w-[350px] float-right">
          <Auth />
          <TopPost />
        </div>
      </main>
      <hr />
      <Footer />
    </>
  );
};

export default Layout;
