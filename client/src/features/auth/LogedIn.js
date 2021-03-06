import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { getUserInfo } from "./authSlice";

const LogedIn = () => {
  const navigate = useNavigate();

  const UserInfo = useSelector(getUserInfo);

  const logout = async () => {
    try {
      const response = await axios.get("/auth/logout");
      localStorage.removeItem("userInfo");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="mb-10">
      <div className="w-full border border-2 border-very_light_one p-3 bg-very_light_three rounded-md">
        <div>
          <p className="text-xs ">어서오세요 </p>
        </div>
        <div>
          <div className="item-center max-w-md w-full bg-white rounded space-y-2 my-1">
            <Link
              className="underline underline-offset-4"
              to={`user/myPage/${UserInfo?.USER_studentID}`}
            >
              {UserInfo?.USER_NICKNAME}
            </Link>
            <span>님</span>
            <div>
              <span>1</span>
              <span>개의 새로운 </span>
              <span>알림</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="text-xs" href="auth/register" onClick={logout}>
            로그아웃
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogedIn;
