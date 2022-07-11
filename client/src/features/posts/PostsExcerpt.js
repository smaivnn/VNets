import { Link } from "react-router-dom";

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
    <div>
      <ul>
        <li className="my-5 border borber-2 border-gray-200 px-[10px] py-[6px] border-l-very_peri border-l-[3px] shadow-md shadow-very_light_one align-middle align-middle">
          <div className="inline-block w-[550px]">
            <a className="block">{post.TITLE.substring(0, 10)}</a>
            <div className="inline-block">
              <span>{DESCRIPTION.substring(0, 75)}</span>
              <span>안녕</span>
            </div>
          </div>
          <div className="inline-block text-right">
            <p className="">작성자</p>
            <p className="text-xs">{post.DATE}</p>
            <p className="text-xs">3 조회 23 추천</p>
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
