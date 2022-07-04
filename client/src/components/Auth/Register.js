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

      console.log("resgister response", JSON.stringify(response));
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
      <section>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="UserId">ID</label>
          <input
            type="text"
            id="UserId"
            // ref={userRef}
            autoComplete="off"
            onChange={(e) => setUserId(e.target.value)}
            value={UserId}
            required
            // aria-invalid={validName ? "false" : "true"}
            // aria-describedby="uidnote"
            // onFocus={() => setUserFocus(true)}
            // onBlur={() => setUserFocus(false)}
          />
          <br />
          <label htmlFor="UserPwd">PASSWORD</label>
          <input
            type="password"
            id="UserPwd"
            onChange={(e) => setUserPwd(e.target.value)}
            value={UserPwd}
            required
            // aria-invalid={validPwd ? "false" : "true"}
            // aria-describedby="pwdnote"
            // onFocus={() => setPwdFocus(true)}
            // onBlur={() => setPwdFocus(false)}
          />
          <br />
          <label htmlFor="confirm_pwd">Confirm Password:</label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={MatchPwd}
            required
            // aria-invalid={validMatch ? "false" : "true"}
            // aria-describedby="confirmnote"
            // onFocus={() => setMatchFocus(true)}
            // onBlur={() => setMatchFocus(false)}
          />
          <br />
          <label htmlFor="UserName">Name</label>
          <input
            type="text"
            id="UserName"
            // ref={userRef}
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            value={UserName}
            required
            // aria-invalid={validName ? "false" : "true"}
            // aria-describedby="uidnote"
            // onFocus={() => setUserFocus(true)}
            // onBlur={() => setUserFocus(false)}
          />
          <br />
          <label htmlFor="studentId">student Id</label>
          <input
            type="text"
            id="studentId"
            // ref={userRef}
            autoComplete="off"
            onChange={(e) => setStudentId(e.target.value)}
            value={StudentId}
            required
            // aria-invalid={validName ? "false" : "true"}
            // aria-describedby="uidnote"
            // onFocus={() => setUserFocus(true)}
            // onBlur={() => setUserFocus(false)}
          />
          <br />
          <label htmlFor="NickName">NickName</label>
          <input
            type="text"
            id="NickName"
            // ref={userRef}
            autoComplete="off"
            onChange={(e) => setNickname(e.target.value)}
            value={Nickname}
            required
            // aria-invalid={validName ? "false" : "true"}
            // aria-describedby="uidnote"
            // onFocus={() => setUserFocus(true)}
            // onBlur={() => setUserFocus(false)}
          />
          <br />
          <button type="submit">BUTTON</button>
        </form>
        <p>
          Already registered?
          <br />
          <span className="line">
            <Link to="/">Sign In</Link>
          </span>
        </p>
      </section>
    </>
  );
};

export default Register;
