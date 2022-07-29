import React, { useState } from "react";
import { parseISO, sub } from "date-fns";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import { getUserInfo } from "../auth/authSlice";

const CommentExcerpt = ({ info, postId }) => {
  const UserInfo = useSelector(getUserInfo);
  const [Comment, setComment] = useState(info.COMMENT);
  const [CommentStatus, setCommentStatus] = useState(false);
  const POST_ID = postId;
  const setCommentBtnClick = (e) => {
    e.preventDefault();
    setCommentStatus(true);
  };

  const setCommentSubmitBtnClick = async (e) => {
    try {
      const response = await axios.put(`post/comment/edit/${POST_ID}`, {
        USER_ID: UserInfo.USER_ID,
        DATE: info.DATE,
        COMMENT: Comment,
        POST_ID: postId,
      });
      if (response.data.success === true) {
        setComment(Comment);
      }
    } catch (error) {
      console.log("fail edit comment");
    }
    setCommentStatus(false);
  };

  const delCommentBtnClick = async (e) => {
    const result = window.confirm(`Do you really want to DELETE?`);
    if (result) {
      try {
        const response = await axios.put(`post/comment/delete/${POST_ID}`, {
          USER_ID: UserInfo.USER_ID,
          DATE: info.DATE,
          POST_ID: postId,
        });
        if (response.data.success === true) {
          window.location.reload();
        }
      } catch (error) {
        console.log("fail edit comment");
      }
    }
  };

  const cancelEditCommentBtn = (e) => {
    setCommentStatus(false);
  };

  return (
    <div className="border border-1 border-gray-300 bg-gray-100 p-3">
      <div className="flex justify-between">
        <div className="flex justify-left items-center mb-3">
          <div className="border-2 border-gray-500 w-[50px] h-[50px] rounded-full overflow-hidden">
            이미지
          </div>
          <div className="ml-2">
            <p className="text-xs text-very_blue">
              {info.USER_NICKNAME} <span>({info.USER_ID})</span>
            </p>
            <p className="text-xs text-gray-500">
              {sub(parseISO(info.DATE), {}).toLocaleString()}
            </p>
          </div>
        </div>

        {UserInfo?.USER_ID === info?.USER_ID ? (
          <div className="">
            {CommentStatus ? (
              <>
                <button onClick={cancelEditCommentBtn} className="block">
                  취소
                </button>
                <button onClick={setCommentSubmitBtnClick} className="block">
                  완료
                </button>
              </>
            ) : (
              <>
                <button onClick={setCommentBtnClick} className="block">
                  수정
                </button>
                <button onClick={delCommentBtnClick} className="block">
                  삭제
                </button>
              </>
            )}
          </div>
        ) : undefined}
      </div>

      {CommentStatus ? (
        <textarea
          id="comment"
          rows="4"
          className="block p-2.5 w-full text-sm text-black-900 bg-very_light_three  border border-gray-300  "
          value={Comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      ) : (
        <p className="text-sm">{Comment}</p>
      )}
    </div>
  );
};

export default CommentExcerpt;
