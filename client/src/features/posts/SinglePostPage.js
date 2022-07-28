import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { getUserInfo } from "../auth/authSlice";
import Comment from "./Comment";
import { matchPageTitle } from "./PostsList";
import { deletePost, selectPostById } from "./postsSlice";

const SinglePostPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => selectPostById(state, params.POST_ID));

  const POST_ID = post?.POST_ID;
  const USER_ID = post?.USER_ID;
  const USER_NICKNAME = post?.USER_NICKNAME;
  const count = post?.LIKE?.count;
  const [LikeCount, setLikeCount] = useState(count);

  function removeHTMLforDescription(text) {
    text = text?.replace(/<br\/>/gi, "\n");
    text = text?.replace(
      /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
      ""
    );
    return text;
  }

  const currentUserId = useSelector(getUserInfo);
  const onLikeBtnClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`post/like/${POST_ID}`, {
        POST_ID,
        USER_ID: currentUserId.USER_ID,
      });
      setLikeCount(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteBtnClick = () => {
    try {
      const result = window.confirm(`Do you really want to DELETE?`);
      if (result) {
        dispatch(
          deletePost({
            POST_ID,
            USER_ID,
            USER_NICKNAME,
          })
        ).unwrap();
        alert(`글이 삭제되었습니다.`);
        navigate(`/board/${post?.CLASSIFICATION}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // post not found
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <h1 className=" text-2xl border-b-2 border-b-very_peri mb-6 pb-5">
        <b> {matchPageTitle(post?.CLASSIFICATION)}</b>
      </h1>
      <div className="border-b border-b-zinc-200">
        <h1 className="text-lg">{post?.TITLE}</h1>
        <div className="inline-block">
          <span className="text-xs border-r border-r-zinc-300 pr-3 mr-3">
            {post?.USER_NICKNAME}({post?.USER_ID})
          </span>
          <span className="text-xs">{post?.DATE}</span>
        </div>
        <div className="inline-block float-right">
          <span className="text-xs border-r border-r-zinc-300 pr-3 mr-3">
            조회
          </span>
          <span className="text-xs border-r border-r-zinc-300 pr-3 mr-3">
            추천
          </span>
          <span className="text-xs ">댓글</span>
        </div>
      </div>

      <div className="my-5 ">
        <p className="text-sm">{removeHTMLforDescription(post?.DESCRIPTION)}</p>
      </div>
      <div className="float-right">
        <button
          onClick={() => navigate(`/board/edit/${post?.POST_ID}`)}
          className="w-[70px] h-[30px] border border-2 border-very_peri bg-white text-very_peri rounded-lg px-2 py-1 transition duration-450 ease select-none hover:bg-very_peri hover:text-white focus:outline-none focus:shadow-outline mx-3"
        >
          수정
        </button>
        <button
          onClick={onDeleteBtnClick}
          className="w-[70px] h-[30px] border border-2 border-very_peri bg-white text-very_peri rounded-lg px-2 py-1 transition duration-450 ease select-none hover:bg-very_peri hover:text-white focus:outline-none focus:shadow-outline "
        >
          삭제
        </button>
      </div>
      <div className="w-full my-10 mx-auto clear-both">
        <p className="min-w-auto w-14 h-14 text-lg text-center pt-4 bg-blue-500 p-2 rounded-full text-white font-semibold  ease-in-out">
          {LikeCount === undefined ? post?.LIKE.count : `${LikeCount}`}
        </p>
        <button
          onClick={onLikeBtnClick}
          className="min-w-auto w-[85px] h-[30px] border border-1 border-black rounded-sm text-xs bg-blue-500 opacity-70 text-white hover:opacity-100  text-white font-semibold transition-transform hover:-translate-y-2 ease-in-out"
        >
          {`추천 up!`}
        </button>
      </div>
      <div>
        {/*comment*/}
        <p className="w-full border-b-2 border-very_peri text-xs clear-both">
          전체 댓글{" "}
          <span className="text-sm text-red-500">{post.COMMENT.length}</span> 개
        </p>
        <Comment postId={POST_ID} />
      </div>
    </section>
  );
};

export default SinglePostPage;
