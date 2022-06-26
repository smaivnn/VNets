import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./authSlice";

const LoginForm = () => {
  const navigate = useNavigate();

  const [UserId, setUserId] = useState("");
  const [UserPwd, setUserPwd] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");

  const onUserIdChanged = (e) => setUserId(e.target.value);
  const onUserPwdChanged = (e) => setUserPwd(e.target.value);

  const dispatch = useDispatch();

  const canSave = [UserId, UserPwd].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          login({
            USER_ID: UserId,
            USER_PASSWORD: UserPwd,
          })
        ).unwrap();

        setUserId("");
        setUserPwd("");

        navigate(`/`);
      } catch (err) {
        console.error("Failed to LOGIN", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  return (
    <section>
      <h2>Login</h2>
      <form>
        <label htmlFor="Id">Id:</label>
        <input
          type="text"
          id="userID"
          name="userID"
          value={UserId}
          onChange={onUserIdChanged}
        />
        <label htmlFor="userPWD">Password:</label>
        <input
          type="password"
          id="userPWD"
          name="userPWD"
          value={UserPwd}
          onChange={onUserPwdChanged}
        />

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          login
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
