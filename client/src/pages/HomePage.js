import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../components/Auth/Auth";
import RecentPost from "../components/Post/RecentPost";
import TopPost from "../components/Post/TopPost";
import axios from "../api/axios";
import {
  selectAllPosts,
  selectPosts,
  selectPostsCategoryCommunity,
  selectPostsCategoryNotice,
  selectPostsCategoryStudy,
} from "../features/posts/postsSlice";
//3등분 css https://tailwindcomponents.com/component/social-feed
// width 1190으로

/*
  배열 4개짜리 만듬(각각이 게시판 이름.) ㅇㅋ
  이후 map을 활용해서 각 게시판 이름을 넘겨주고 이것이 곧 title ㅇㅋ
  이름을 통해서 post중에서 classigication을 가져와서 가능 상위 5개 글을 넣는다.
  왜냐면 Date를 토대로 정렬이 되어있기 때문.
*/
const OPTIONS = [
  { value: "notice", name: "공지사항" },
  { value: "question", name: "질문" },
  { value: "study", name: "스터디" },
  { value: "community", name: "커뮤니티" },
];
const HomePage = () => {
  const [Notice, setNotice] = useState([]);
  const [Question, setQuestion] = useState([]);
  const [Study, setStudy] = useState([]);
  const [Community, setCommunity] = useState([]);
  useEffect(() => {
    async function getRecentPost(category) {
      try {
        const response = await axios.get(`post/recent`, {
          params: {
            category: category,
          },
        });
        setNotice(response.data.notice);
        setQuestion(response.data.question);
        setStudy(response.data.study);
        setCommunity(response.data.community);
      } catch (error) {
        console.log(error);
      }
    }
    const value = OPTIONS.map((items) => items.value);
    getRecentPost(value);
  }, []);

  let optItems = OPTIONS.map((items, idx) => {
    return (
      <RecentPost
        key={idx}
        postTypes={items}
        postObj={
          items.value === "notice"
            ? Notice
            : items.value === "question"
            ? Question
            : items.value === "study"
            ? Study
            : items.value === "community"
            ? Community
            : undefined
        }
      />
    );
  });

  return (
    <div className="relative w-full mx-auto ">
      {" "}
      <div>
        {optItems}
        {/*w-96 inline-block min-w-min*/}
      </div>
    </div>
  );
};

export default HomePage;
