import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
//let

function removeHTMLforExcerpt(text) {
  text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi, "");
  return text;
}

function removeHTMLforDescription(text) {
  text = text.replace(/<br\/>/gi, "\n");
  text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi, "");
  return text;
}

const PostsExcerpt = ({ postId }) => {
  // excerpt : 발췌
  const post = useSelector((state) => selectPostById(state, postId));
  const DESCRIPTION = removeHTMLforExcerpt(post.DESCRIPTION);
  return (
    <div key={post.POST_ID}>
      <ul>
        {post.COMMENT.filter((element) => element.VISIBLE === true).length !==
        0 ? (
          <li className="my-3 border borber-2 border-gray-200 px-[10px] py-[6px] border-l-very_peri border-l-[4px] shadow-md shadow-very_light_one align-middle align-middle">
            <div className="inline-block w-[550px]">
              <Link
                className="block"
                to={{ pathname: `/board/${post.POST_ID}` }}
              >
                {post.TITLE.substring(0, 10)}
              </Link>
              <div className="inline-block">
                <Link to={{ pathname: `/board/${post.POST_ID}` }}>
                  {DESCRIPTION.substring(0, 75)}
                </Link>
              </div>
            </div>
            <div className="inline-block text-right">
              <p className="">작성자</p>
              <p className="text-xs">{post.DATE}</p>
              <p className="text-xs">{` 조회 0 추천 ${post.LIKE.count}`}</p>
            </div>
          </li>
        ) : (
          <li className="my-3 border borber-2 border-gray-200 px-[10px] py-[6px] border-l-very_lightgray border-l-[4px] shadow-md shadow-very_lightgray align-middle align-middle">
            <div className="inline-block w-[550px]">
              <Link
                className="block"
                to={{ pathname: `/board/${post.POST_ID}` }}
              >
                {post.TITLE.substring(0, 10)}
              </Link>
              <div className="inline-block">
                <Link to={{ pathname: `/board/${post.POST_ID}` }}>
                  {DESCRIPTION.substring(0, 75)}
                </Link>
              </div>
            </div>
            <div className="inline-block text-right">
              <p className="">작성자</p>
              <p className="text-xs">{post.DATE}</p>
              <p className="text-xs">{` 조회 0 추천 ${post.LIKE.count}`}</p>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

// PostsExcerpt = React.memo(PostsExcerpt);

export default PostsExcerpt;
