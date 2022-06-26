import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

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
        <Outlet />
      </main>
      <hr />
      <Footer />
    </>
  );
};

export default Layout;
