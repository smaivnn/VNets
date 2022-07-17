import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { matchPageTitle } from "./PostsList";
import { selectPostById } from "./postsSlice";

const SinglePostPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => selectPostById(state, params.POST_ID));
  console.log(post);

  function removeHTMLforDescription(text) {
    text = text?.replace(/<br\/>/gi, "\n");
    text = text?.replace(
      /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
      ""
    );
    return text;
  }

  const onDeleteBtnClick = () => {
    try {
    } catch (error) {}
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
    </section>
  );
};

export default SinglePostPage;
