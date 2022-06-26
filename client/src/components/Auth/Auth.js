import React from "react";

///////////////////////////////////////////////

//      로그인 state를 만들어 로그인 상태에 따라
//      서로 다른 화면을 보이도록 생성

//////////////////////////////////////////////

const Auth = () => {
  return (
    <section className="mb-10">
      <div className="w-full border border-2 border-very_light_one p-3 bg-very_light_three rounded-md">
        <div>
          <p className="text-xs ">어서오세요</p>
        </div>
        <div>
          <form className="item-center max-w-md w-full bg-white rounded space-y-2 my-1">
            <div>
              <label for="ID" className="sr-only">
                아이디
              </label>
              <input
                type="text"
                id="ID"
                className="border border-very_peri px-4 py-2 outline-none rounded-sm w-full text-xs text-black-100"
                placeholder="ID"
                required
              />
            </div>
            <div>
              <label for="PASSWORD" className="sr-only">
                비밀번호
              </label>
              <input
                type="password"
                id="PASSWORD"
                className="border border-very_peri px-4 py-2 outline-none rounded-sm w-full text-xs text-black-100"
                placeholder="PASSWORD"
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
          <a className="text-xs">회원가입</a>
        </div>
      </div>
    </section>
  );
};

export default Auth;
