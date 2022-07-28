import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/axios";
import { getUserInfo } from "../auth/authSlice";
import CommentExcerpt from "./CommentExcerpt";
import { selectPostById } from "./postsSlice";

const Comment = ({ postId }) => {
  const userInfo = useSelector(getUserInfo);
  const post = useSelector((state) => selectPostById(state, postId));

  const [Comment, setComment] = useState("");

  const handleCommentBtn = async () => {
    try {
      await axios.post(`post/comment/${postId}`, {
        USER_ID: userInfo.USER_ID,
        USER_NICKNAME: userInfo.USER_NICKNAME,
        COMMENT: Comment,
        POST_ID: postId,
        DATE: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="">
      {post.COMMENT.map((items, idx) => {
        return <CommentExcerpt info={items} key={idx} />;
      })}
      <div className="w-full border-y-2 border-very_peri mt-10 py-5">
        <form>
          <textarea
            id="comment"
            rows="4"
            className="block p-2.5 w-full text-sm text-black-900 bg-very_light_three  border border-gray-300  "
            placeholder="댓글 남기기"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-3">
            <button
              onClick={handleCommentBtn}
              className="w-[85px] h-[30px] border border-1 border-black rounded-sm text-xs bg-very_blue text-white"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Comment;
