import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PostsExcerpt from "../posts/PostsExcerpt";
import Pagination from "../posts/Pagination";
import {
  getPostsStatus,
  getPostsError,
  selectAllPosts,
} from "../posts/postsSlice";
import { getUserInfo } from "../auth/authSlice";

const UserPostList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postsStatus = useSelector(getPostsStatus); // current posting status
  const error = useSelector(getPostsError);
  const UserInfo = useSelector(getUserInfo);
  const getPost = useSelector(selectAllPosts);
  const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(5);
  const [PostArr, setPostArr] = useState([]); // 페이지 분류한 배열
  const [CurrentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [TotalPost, setTotalPost] = useState(1); // 배열 총 길이 : 총 포스트 개수
  /*
  // 시작점. (현재 페이지 번호 - 1) * 제한 -> 배열의 시작점
  // if(37개), 현재 2페이지일 경우, 2페이지 시작점 -> 2-1 * 10 = 10. 배열의 10번째 항목(0부터 시작)
  */
  const offset = (CurrentPage - 1) * ITEMS_PER_PAGE;

  useEffect(() => {
    // 카테고리별로 분류한 새로운 배열 생성.
    const PostArr = getPost.filter(
      (element) => element.USER_ID === UserInfo?.USER_ID
    );
    setPostArr(PostArr);

    // 총 포스팅 개수 설정.
    setTotalPost(PostArr.length);
  }, [UserInfo]);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    // 시작점
    content = PostArr.slice(offset, offset + ITEMS_PER_PAGE).map(
      (post, idx) => {
        return <PostsExcerpt key={idx} postId={post.POST_ID} />;
      }
    );
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <div className="w-full mb-5 flex justify-between">
        <h1 className="text-2xl inline-block">내 게시물</h1>
        <div className="inline-block">
          <label>
            게시물 수:&nbsp;
            <select
              type="number"
              value={ITEMS_PER_PAGE}
              onChange={({ target: { value } }) =>
                setITEMS_PER_PAGE(Number(value))
              }
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="2">2</option>
            </select>
          </label>
        </div>
      </div>
      <div className="clear-both">{content}</div>

      <section className="">
        <Pagination
          TotalPost={TotalPost}
          ITEMS_PER_PAGE={ITEMS_PER_PAGE}
          CurrentPage={CurrentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </section>
  );
};

export default UserPostList;
