import React from "react";

const PostList = () => {
  return (
    <section>
      <div>
        <span>공지사항</span>
        <span>브이넷 공지사항입니다.</span>
      </div>
      <div>
        <ul>
          <li className="my-5 border borber-2 border-gray-200 px-[10px] py-[6px] border-l-very_peri border-l-[3px] shadow-md shadow-very_light_one">
            <a>제목</a>
            <div className="inline-block float-right">
              <span>writer</span>
              <span>date</span>
            </div>
          </li>

          <li className="border borber-2 border-gray-200 px-[10px] py-[6px] border-l-very_lightgray border-l-[3px] shadow-md">
            <a>제목</a>
            <div className="inline-block float-right">
              <span>writer</span>
              <span>date</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PostList;
