import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectPostById, updatePost } from "./postsSlice";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { getUserInfo } from "../auth/authSlice";

const OPTIONS = [
  { value: "notice", name: "공지사항" },
  { value: "question", name: "질문" },
  { value: "study", name: "스터디" },
  { value: "community", name: "커뮤니티" },
];

const EditSinglePost = () => {
  const { POST_ID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => selectPostById(state, Number(POST_ID)));
  // const convertedDescription = convertFromRaw(JSON.parse(post.DESCRIPTION));
  const [TITLE, setTITLE] = useState(post.TITLE);
  const blocksFromHtml = htmlToDraft(post.DESCRIPTION);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const editorState = EditorState.createWithContent(contentState);
  const [DESCRIPTION, setDESCRIPTION] = useState(editorState);
  const [CLASSIFICATION, setCLASSIFICATION] = useState(post.CLASSIFICATION);
  const userInfo = useSelector(getUserInfo);
  const [requestStatus, setRequestStatus] = useState("idle");
  const onEditorStateChange = (DESCRIPTION) => {
    // editorState에 값 설정
    setDESCRIPTION(DESCRIPTION);
  };

  const onSelectChange = (e) => {
    setCLASSIFICATION(e.target.value);
    console.log(CLASSIFICATION);
  };

  const canSave = [TITLE, CLASSIFICATION, DESCRIPTION].every(Boolean); // && requestStatus === "idle"

  const submitHandler = (e) => {
    const editorToHtml = draftToHtml(
      convertToRaw(DESCRIPTION.getCurrentContent())
    );
    if (canSave) {
      const USER_ID = userInfo.USER_ID;
      const USER_NICKNAME = userInfo.USER_NICKNAME;
      try {
        dispatch(
          updatePost({
            USER_ID,
            USER_NICKNAME,
            TITLE,
            CLASSIFICATION,
            DESCRIPTION: editorToHtml,
            POST_ID,
          })
        ).unwrap();
        setTITLE("");
        setDESCRIPTION("");
        navigate(`/board/${POST_ID}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const SelectBox = (props) => {
    return (
      <select value={CLASSIFICATION} onChange={onSelectChange}>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };

  return (
    <section>
      <form>
        <label htmlFor="TITLE" className="sr-only">
          제목
        </label>
        <input
          type="text"
          id="TITLE"
          className="border border-very_gray border-1 px-4 py-2 outline-none rounded-sm w-full text-lg text-black-100"
          placeholder="Title"
          value={TITLE}
          onChange={(e) => setTITLE(e.target.value)}
          required
        />

        <label htmlFor="CLASSIFICATION" className="sr-only">
          분류
        </label>
        <SelectBox options={OPTIONS}></SelectBox>

        <Editor
          editorState={DESCRIPTION}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          placeholder="Wirte down you post!"
          editorStyle={editorStyle}
          onEditorStateChange={onEditorStateChange}
          handlePastedText={() => false}
          toolbar={{
            options: ["inline", "blockType", "list", "textAlign", "history"],
            inline: { inDropdown: true },
            fontSize: { inDropdown: true },
          }}
        />
        <button
          type="submit"
          className="w-[80px] h-[30px] border border-2 border-very_peri mt-3 bg-white text-very_peri rounded-md px-2 py-1 transition duration-450 ease select-none hover:bg-very_peri hover:text-white focus:outline-none focus:shadow-outline float-right"
          onClick={submitHandler}
        >
          저장
        </button>
      </form>
    </section>
  );
};

export default EditSinglePost;

const editorStyle = {
  border: "1px solid #464555",
  borderRadius: "5px",
  padding: "5px ",
  height: "500px",
  overflow: "auto",
};
