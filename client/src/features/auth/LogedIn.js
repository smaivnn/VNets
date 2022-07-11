import React from "react";

const LogedIn = () => {
  return (
    <section className="mb-10">
      <div className="w-full border border-2 border-very_light_one p-3 bg-very_light_three rounded-md">
        <div>
          <p className="text-xs ">어서오세요 </p>
        </div>
        <div>
          <div className="item-center max-w-md w-full bg-white rounded space-y-2 my-1">
            <span>NICK_NAME</span>
            <span>님</span>
            <div>
              <span>1</span>
              <span>개의 새로운 </span>
              <span>알림</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <a className="text-xs" href="auth/register">
            로그아웃
          </a>
        </div>
      </div>
    </section>
  );
};

export default LogedIn;
