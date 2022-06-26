import React from "react";
import Auth from "../components/Auth/Auth";
import RecentPost from "../components/Post/RecentPost";
import TopPost from "../components/Post/TopPost";

//3등분 css https://tailwindcomponents.com/component/social-feed
// width 1190으로
const HomePage = () => {
  return (
    <div className="relative w-full mx-auto ">
      {" "}
      <div className="inline-block w-[750px] float-left">
        {" "}
        {/*w-96 inline-block min-w-min*/}
        <RecentPost /> {/*공지사항*/}
        <RecentPost /> {/*커뮤니티*/}
        <RecentPost /> {/*질문*/}
        <RecentPost /> {/*스터디*/}
      </div>
      <div className="inline-block w-[350px] float-right">
        {" "}
        {/*w-80 inline-block min-w-min */}
        <Auth />
        <TopPost />
      </div>
    </div>
  );
};

export default HomePage;
