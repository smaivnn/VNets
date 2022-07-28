import React, { useState } from "react";
import { parseISO, sub } from "date-fns";

const CommentExcerpt = ({ info }) => {
  const [Comment, setComment] = useState(info.COMMENT);
  const [CommentStatus, setCommentStatus] = useState(false);

  const setCommentBtnClick = (e) => {
    e.preventDefault();
    setCommentStatus(true);
  };

  const setCommentSubmitBtnClick = (e) => {
    setCommentStatus(false);
  };

  const delCommentBtnClick = (e) => {};

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

        <div className="">
          <button onClick={setCommentBtnClick} className="block">
            수정
          </button>
          {CommentStatus ? (
            <button onClick={setCommentSubmitBtnClick} className="block">
              완료
            </button>
          ) : (
            <button onClick={delCommentBtnClick} className="block">
              삭제
            </button>
          )}
        </div>
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
        <p className="text-sm">{info.COMMENT}</p>
      )}
    </div>
  );
};

export default CommentExcerpt;
