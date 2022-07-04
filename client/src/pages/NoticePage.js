import React from "react";
import Auth from "../components/Auth/Auth";
import PostList from "../components/Post/PostList";
import TopPost from "../components/Post/TopPost";

const NoticePage = () => {
  return (
    <div className="relative w-full mx-auto ">
      <div className="inline-block w-[750px] float-left">
        <PostList /> {/*공지사항*/}
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

export default NoticePage;
