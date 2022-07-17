import React, { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const REGISTER_URL = "/auth/register";

const Register = () => {
  const [UserId, setUserId] = useState("");
  const [UserPwd, setUserPwd] = useState("");
  const [MatchPwd, setMatchPwd] = useState("");
  const [UserName, setUserName] = useState("");
  const [StudentId, setStudentId] = useState("");
  const [Nickname, setNickname] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          USER_ID: UserId,
          USER_PASSWORD: UserPwd,
          USER_NAME: UserName,
          USER_studentID: StudentId,
          USER_NICKNAME: Nickname,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Register Success", response.data);
      setUserId("");
      setUserPwd("");
      setMatchPwd("");
      setUserName("");
      setStudentId("");
      setNickname("");
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
      } else if (err.response?.status === 409) {
        console.log("Username Taken");
      } else {
        console.log("Registration Failed");
      }
    }
  };

  return (
    <>
      <section className="w-max mx-auto">
        <h1 className="text-2xl mb-5">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="border border-2 border-very_light_one p-10 rounded-md"
        >
          <label htmlFor="UserId" className="inline-block w-[200px]">
            ID :
          </label>
          <input
            className="w-full text-sm mb-8 border-b-2 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
            type="text"
            id="UserId"
            autoComplete="off"
            onChange={(e) => setUserId(e.target.value)}
            value={UserId}
            required
          />
          <br />
          <label htmlFor="UserPwd" className="inline-block w-[200px]">
            Password :
          </label>
          <input
            className="w-full text-sm mb-8 border-b-2 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
            type="password"
            id="UserPwd"
            onChange={(e) => setUserPwd(e.target.value)}
            value={UserPwd}
            required
          />
          <br />
          <label htmlFor="confirm_pwd" className="inline-block w-[200px] ">
            Confirm Password :
          </label>
          <input
            className="w-full text-sm mb-8 border-b-2 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={MatchPwd}
            required
          />
          <br />
          <label htmlFor="UserName" className="inline-block w-[200px]">
            Name :
          </label>
          <input
            className="w-full text-sm mb-8 border-b-2 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
            type="text"
            id="UserName"
            // ref={userRef}
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            value={UserName}
            required
          />
          <br />
          <label htmlFor="studentId" className="inline-block w-[200px]">
            student Id :
          </label>
          <input
            className="w-full text-sm mb-8 border-b-2 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
            type="text"
            id="studentId"
            autoComplete="off"
            onChange={(e) => setStudentId(e.target.value)}
            value={StudentId}
            required
          />
          <br />
          <label htmlFor="NickName" className="inline-block w-[200px]">
            Nickname :
          </label>
          <input
            className="w-full text-sm mb-8 border-b-2 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
            type="text"
            id="NickName"
            autoComplete="off"
            onChange={(e) => setNickname(e.target.value)}
            value={Nickname}
            required
          />
          <br />
          <button
            type="submit"
            className="transform text-2xl w-full rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
          >
            Join us !
          </button>
        </form>
      </section>
    </>
  );
};

export default Register;
