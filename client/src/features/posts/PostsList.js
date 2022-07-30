import { useEffect, useState } from "react";
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
import Pagination from "./Pagination";

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
  const getPost = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus); // current posting status
  const error = useSelector(getPostsError);
  const CLASSIFICATION = location.pathname.split("/")[2];

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
      (element) => element.CLASSIFICATION === CLASSIFICATION
    );
    setPostArr(PostArr);

    // 총 포스팅 개수 설정.
    setTotalPost(PostArr.length);
  }, [getPost]);

  const matchPageSubTitle = (currentPage) => {
    return `브이넷 ${PageHead[currentPage]} 게시판 입니다.`;
  };

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
      <div>
        <div>
          <p className="text-2xl">
            <b>{matchPageTitle(CLASSIFICATION)}</b>
          </p>
          <p className="inline-block mt-2">
            <i>{matchPageSubTitle(CLASSIFICATION)}</i>
          </p>

          <div className="float-right">
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

            <button
              type="button"
              className="w-[80px] h-[30px] border border-2 border-very_peri bg-white text-very_peri rounded-md px-2 py-1 transition duration-450 ease select-none hover:bg-very_peri hover:text-white focus:outline-none focus:shadow-outline "
              onClick={() => navigate(`/board/create`)}
            >
              글쓰기
            </button>
          </div>
        </div>
        {content}
      </div>

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

export default PostsList;
