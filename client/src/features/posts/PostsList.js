import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostIds,
  getPostsStatus,
  getPostsError,
  fetchPosts,
  selectPosts,
  selectAllPosts,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { store } from "../../app/store";
import { useNavigate, useLocation } from "react-router-dom";

/*
  모든 포스트를 불러와서 
  목록에 나타낸다.
*/

export const PageHead = {
  notice: "공지사항",
  study: "스터디",
  question: "질문",
  community: "커뮤니티",
};

export const matchPageTitle = (currentPage) => {
  return PageHead[currentPage];
};
const PostsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getpost = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus); // current posting status
  const error = useSelector(getPostsError);
  const CLASSIFICATION = location.pathname.split("/")[2];

  const matchPageSubTitle = (currentPage) => {
    return `브이넷 ${PageHead[currentPage]} 게시판 입니다.`;
  };

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    content = getpost.map((post, idx) => {
      if (post.CLASSIFICATION === CLASSIFICATION)
        return <PostsExcerpt key={idx} postId={post.POST_ID} />;
    });
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <div>
        <div>
          <p className="text-2xl">
            <b>{matchPageTitle(CLASSIFICATION)}</b>
          </p>
          <p className="inline-block mt-2">
            <i>{matchPageSubTitle(CLASSIFICATION)}</i>
          </p>
          <button
            type="button"
            className="w-[80px] h-[30px] border border-2 border-very_peri bg-white text-very_peri rounded-md px-2 py-1 transition duration-450 ease select-none hover:bg-very_peri hover:text-white focus:outline-none focus:shadow-outline float-right"
            onClick={() => navigate(`/board/create`)}
          >
            글쓰기
          </button>
        </div>
        {content}
      </div>
    </section>
  );
};

export default PostsList;
