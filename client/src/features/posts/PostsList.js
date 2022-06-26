import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";

import PostsExcerpt from "./PostsExcerpt";

/*
  모든 포스트를 불러와서 
  목록에 나타낸다.
*/

const PostsList = () => {
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
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
