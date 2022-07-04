import React from "react";

////////////////////////////////

//      li태그 dynamic하게 만들기.
//      공지사항, 인기글, 커뮤니티, 스터디, 질문,
//      classname을 hasNote와 noNote => 댓글 여부로 적용 border-l 따로하기

////////////////////////////////

const TopPost = () => {
  return (
    <section className="border border-2 border-very_light_one p-3 bg-very_light_three rounded-md ">
      <div className="">
        <p className="text-xl text-black-500 text-center">Top10 인기글</p>
      </div>
      <ul className="">
        <li className="border borber-2 border-gray-200 px-[10px] py-[6px] border-l-very_peri border-l-[3px] ">
          <a className="">1</a>
          <div className="inline-block float-right">
            <span>writer</span>
            <span>date</span>
          </div>
        </li>
        <li className="border borber-2 border-gray-200 px-[10px] py-[6px] ">
          <a className="p-1">2</a>
        </li>
        <li className="border borber-2 border-gray-200 px-[10px] py-[6px] ">
          <a className="p-1">3</a>
        </li>
        <li className="border borber-2 border-gray-200 px-[10px] py-[6px] ">
          <a className="p-1">4</a>
        </li>
        <li className="border borber-2 border-gray-200 px-[10px] py-[6px] ">
          <a className="p-1">5</a>
        </li>
      </ul>
    </section>
  );
};

export default TopPost;
