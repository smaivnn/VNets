import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";

import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { getUserInfo } from "../auth/authSlice";

const OPTIONS = [
  { value: "notice", name: "공지사항" },
  { value: "question", name: "질문" },
  { value: "study", name: "스터디" },
  { value: "community", name: "커뮤니티" },
];

const TextEditor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(getUserInfo);

  const [TITLE, setTITLE] = useState("");
  const [CLASSIFICATION, setCLASSIFICATION] = useState("");

  const [DESCRIPTION, setDESCRIPTION] = useState(EditorState.createEmpty());

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
    e.preventDefault();
    const editorToHtml = draftToHtml(
      convertToRaw(DESCRIPTION.getCurrentContent())
    );
    if (canSave) {
      const USER_ID = userInfo.USER_ID;
      const USER_NICKNAME = userInfo.USER_NICKNAME;

      try {
        dispatch(
          addNewPost({
            USER_ID,
            USER_NICKNAME,
            TITLE,
            CLASSIFICATION,
            DESCRIPTION: editorToHtml,
          })
        )
          .unwrap()
          .then((result) => {
            setTITLE("");
            setDESCRIPTION("");

            navigate(`/board/${result.result.POST_ID}`);
          });
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
            // list: { inDropdown: true },
            // textAlign: { inDropdown: true },
            // embedded: { inDropdown: true },
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

export default TextEditor;

const editorStyle = {
  border: "1px solid #464555",
  borderRadius: "5px",
  padding: "5px ",
  height: "500px",
  overflow: "auto",
};
