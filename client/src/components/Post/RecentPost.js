import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { parseISO, sub } from "date-fns";
import {
  selectAllPosts,
  selectAllSortedPosts,
} from "../../features/posts/postsSlice";

////////////////////////////////

//      li태그 dynamic하게 만들기.
//      공지사항, 인기글, 커뮤니티, 스터디, 질문,

////////////////////////////////

const RecentPost = ({ postTypes, postObj }) => {
  const post = useSelector(selectAllSortedPosts);
  console.log(postObj);

  return (
    <section className="mb-10 border border-2 border-very_light_one p-3 bg-very_light_three rounded-md">
      <div className="">
        <p className="text-xl text-black-500 text-center">{postTypes.name}</p>
      </div>

      <ul className="">
        {postObj.map((post, idx) => {
          return (
            <li
              className="border borber-2 border-gray-200 px-[10px] py-[6px] border-l-very_peri border-l-[3px] "
              key={idx}
            >
              <a className="">{post.TITLE}</a>
              <div className="inline-block float-right">
                <span>
                  {post.USER_NICKNAME} <span>({post.USER_ID})</span>
                </span>
                <span>{sub(parseISO(post.DATE), {}).toLocaleString()}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default RecentPost;
