import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";

import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const TextEditor = () => {
  const [TITLE, setTITLE] = useState("");

  const [DESCRIPTION, setDESCRIPTION] = useState(EditorState.createEmpty());

  const onEditorStateChange = (DESCRIPTION) => {
    // editorState에 값 설정
    setDESCRIPTION(DESCRIPTION);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(TITLE);
    console.log(draftToHtml(convertToRaw(DESCRIPTION.getCurrentContent())));
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
