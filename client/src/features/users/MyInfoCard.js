import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo } from "../auth/authSlice";

const MyInfoCard = () => {
  const UserInfo = useSelector(getUserInfo);

  return (
    <div className="w-full bg-neutral-100 border border-1 border-neutral-300 py-5 text-center mb-10">
      <div className="inline-block w-[150px] h-[150px] mr-5">
        <img
          src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
          className="shadow-xl rounded-full align-middle border-none  w-full"
        />
      </div>
      <div className="inline-block w-[500px]">
        <div>
          <div className="w-full mx-auto">
            <span className="text-2xl">{UserInfo?.USER_NICKNAME}</span>
            <span className="text-md">({UserInfo?.USER_ID})</span>
          </div>

          <div className="inline-block ml-3">
            <span className="border bg-blue-100 border-1 border-indigo-300 text-xs rounded-md p-0.5 m-0.5">
              # {UserInfo?.USER_PROFILE[0]}
            </span>
            <span className="border bg-blue-100 border-1 border-indigo-300 text-xs rounded-md p-0.5 m-0.5">
              # {UserInfo?.USER_PROFILE[1]}
            </span>
            <span className="border bg-blue-100 border-1 border-indigo-300 text-xs rounded-md p-0.5 m-0.5">
              # {UserInfo?.USER_PROFILE[2]}
            </span>
            <span className="border bg-blue-100 border-1 border-indigo-300 text-xs rounded-md p-0.5 m-0.5">
              # {UserInfo?.USER_PROFILE[3]}
            </span>
          </div>
        </div>
        <div className="w-[500px] h-[50px] text-left my-3 overflow-hidden">
          <p className="text-sm">comment :</p>
          <p className="">{UserInfo?.USER_PROFILE[6]}</p>
        </div>

        <div className="w-full flex justify-center">
          <a href="javascript:void(0)" className="mx-5">
            <div aria-label="Github" role="img">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#718096"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-github"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
          </a>

          <a href="javascript:void(0)" className="mx-5">
            <div aria-label="Instagram" role="img">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#718096"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-instagram"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
          </a>
          <Link
            to={`/user/myPage/edit/${UserInfo?.USER_studentID}`}
            className="mx-5"
          >
            <div aria-label="Instagram" role="img">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#718096"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-edit"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyInfoCard;
