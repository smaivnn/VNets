import { useSelector } from "react-redux";
import {
  selectPostIds,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { store } from "../../app/store";
import { useNavigate } from "react-router-dom";

/*
  모든 포스트를 불러와서 
  목록에 나타낸다.
*/

store.dispatch(fetchPosts());

const PostsList = () => {
  const navigate = useNavigate();
  const orderedPostsIds = useSelector(selectPostIds); // all post
  const postsStatus = useSelector(getPostsStatus); // current posting status
  const error = useSelector(getPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    // 시간순 정렬
    content = orderedPostsIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
    console.log("ordered", orderedPostsIds);
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      {/* className="relative w-full mx-auto " */}
      {/* <div className="inline-block w-[750px] float-left">
        <div>
          <span>공지사항</span>
          <span>브이넷 공지사항입니다.</span>
          <button
            type="button"
            className="w-[80px] h-[30px] border border-2 border-very_peri bg-white text-very_peri rounded-md px-2 py-1 m-2 transition duration-450 ease select-none hover:bg-very_peri hover:text-white focus:outline-none focus:shadow-outline"
          >
            글쓰기
          </button>
        </div>
        {content}
      </div>
      <div className="inline-block w-[350px] float-right">
        <Auth />
        <TopPost />
      </div> */}

      <div>
        <div>
          <p className="text-2xl">공지사항</p>
          <p className="inline-block mt-2">브이넷 공지사항입니다.</p>
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
