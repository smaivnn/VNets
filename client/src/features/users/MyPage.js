import React from "react";
import { Outlet } from "react-router-dom";
import MyInfoCard from "./MyInfoCard";
import EditUserInfo from "./EditUserInfo";
import UserPostList from "./UserPostList";

const myPage = () => {
  return (
    <section>
      {
        //카드박스
      }
      <MyInfoCard />
      <div>
        <Outlet />
        {
          //내 게시물
        }
      </div>
    </section>
  );
};

export default myPage;
