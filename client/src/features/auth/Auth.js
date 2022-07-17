import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, loginCheck } from "./authSlice";
import { store } from "../../app/store";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const LOGIN_CHECK_URL = "/auth/loginCheck";
///////////////////////////////////////////////

//      로그인 state를 만들어 로그인 상태에 따라
//      서로 다른 화면을 보이도록 생성
/* , {
        headers: { Authorization: `Bearer ${userInfo.accessToken}` },
      } */
//////////////////////////////////////////////

const Auth = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  // const navigate = useNavigate();

  const [USER_ID, setUSER_ID] = useState("");
  const [USER_PASSWORD, setUSER_PASSWORD] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");

  const canSave =
    [USER_ID, USER_PASSWORD].every(Boolean) && requestStatus === "idle";

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          login({
            USER_ID,
            USER_PASSWORD,
          })
        ).unwrap(); //두번 보내서 그냥

        setUSER_ID("");
        setUSER_ID("");
        console.log("login success");
        // navigate("/");
      } catch (err) {
        if (!err?.response) {
          console.log("No Server Response");
        } else if (err.response?.status === 400) {
          console.log("Missing Username or Password");
        } else if (err.response?.status === 401) {
          console.log("Unauthorized");
        } else {
          console.log("Login Failed");
        }
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  return (
    <section className="mb-10">
      <div className="w-full border border-2 border-very_light_one p-3 bg-very_light_three rounded-md">
        <div>
          <p className="text-xs ">어서오세요</p>
        </div>
        <div>
          <form
            className="item-center max-w-md w-full bg-white rounded space-y-2 my-1"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="ID" className="sr-only">
                아이디
              </label>
              <input
                type="text"
                id="ID"
                className="border border-very_peri px-4 py-2 outline-none rounded-sm w-full text-xs text-black-100"
                placeholder="ID"
                onChange={(e) => setUSER_ID(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="PASSWORD" className="sr-only">
                비밀번호
              </label>
              <input
                type="password"
                id="PASSWORD"
                className="border border-very_peri px-4 py-2 outline-none rounded-sm w-full text-xs text-black-100"
                placeholder="PASSWORD"
                onChange={(e) => setUSER_PASSWORD(e.target.value)}
                required
              />
            </div>
            <button className="item-center bg-very_peri text-very_light_three rounded-sm w-full text-md h-9">
              VNETS로그인
            </button>
          </form>
        </div>
        <div className="flex justify-between">
          <a className="text-xs">아이디·비밀번호찾기</a>
          <a className="text-xs" href="/auth/register">
            회원가입
          </a>
        </div>
      </div>
    </section>
  );
};

export default Auth;
