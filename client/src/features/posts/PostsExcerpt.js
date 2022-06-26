import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

//let
const PostsExcerpt = ({ postId }) => {
  // excerpt : 발췌
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <div>
      <ul>
        <li class="my-5 border borber-2 border-gray-200 px-[10px] py-[6px] border-l-very_peri border-l-[3px] shadow-md shadow-very_light_one">
          <a>{post.TITLE}</a>
          <div class="inline-block float-right">
            <span>{post.WRITER}</span>
            <span>{post.DATE}</span>
          </div>
        </li>

        {/* <li class="border borber-2 border-gray-200 px-[10px] py-[6px] border-l-very_lightgray border-l-[3px] shadow-md">
          <a>제목</a>
          <div class="inline-block float-right">
            <span>writer</span>
            <span>date</span>
          </div>
        </li> */}
      </ul>
    </div>
  );
};

// PostsExcerpt = React.memo(PostsExcerpt);

export default PostsExcerpt;
