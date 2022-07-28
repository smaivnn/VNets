import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

////////////////////////////////

//      li태그 dynamic하게 만들기.
//      공지사항, 인기글, 커뮤니티, 스터디, 질문,
//      classname을 hasNote와 noNote => 댓글 여부로 적용 border-l 따로하기

////////////////////////////////

const TopPost = () => {
  const [TopPost, setTopPost] = useState([]);

  useEffect(() => {
    async function getTopPost() {
      try {
        const response = await axios.get(`post/best`);
        setTopPost(response.data);
        console.log("top", TopPost);
      } catch (error) {
        console.log(error);
      }
    }

    getTopPost();
  }, []);

  let content;
  content = TopPost?.map((post, idx) => {
    return (
      <li
        key={idx}
        className="border borber-2 border-gray-200 px-[10px] py-[6px] border-l-very_peri border-l-[3px] "
      >
        <a className="">{post?.TITLE}</a>
        <div className="inline-block float-right">
          <span>{post?.WRITER}</span>
          <span>date</span>
        </div>
      </li>
    );
  });
  return (
    <section className="border border-2 border-very_light_one p-3 bg-very_light_three rounded-md ">
      <div className="">
        <p className="text-xl text-black-500 text-center">Top10 인기글</p>
      </div>
      <ul className="">{content}</ul>
    </section>
  );
};

export default TopPost;
