import React from "react";
import { useSelector } from "react-redux";

const Unauthorized = () => {
  return (
    <>
      <div>unauthorized</div>
      <button onClick={console.log("hi")}>버튼 </button>
    </>
  );
};

export default Unauthorized;
