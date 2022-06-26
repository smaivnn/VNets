import React from "react";

////////////////////////////////

//      li태그 dynamic하게 만들기.
//      공지사항, 인기글, 커뮤니티, 스터디, 질문,

////////////////////////////////

const RecentPost = () => {
  return (
    <section class="mb-10 border border-2 border-very_light_one p-3 bg-very_light_three rounded-md">
      <div class="">
        <p class="text-xl text-black-500 text-center">title</p>
      </div>
      <ul class="">
        <li class="border borber-2 border-gray-200 px-[10px] py-[6px] border-l-very_peri border-l-[3px] ">
          <a class="">1</a>
          <div class="inline-block float-right">
            <span>writer</span>
            <span>date</span>
          </div>
        </li>
        <li class="border borber-2 border-gray-200 px-[10px] py-[6px] ">
          <a class="p-1">2</a>
        </li>
        <li class="border borber-2 border-gray-200 px-[10px] py-[6px] ">
          <a class="p-1">3</a>
        </li>
        <li class="border borber-2 border-gray-200 px-[10px] py-[6px] ">
          <a class="p-1">4</a>
        </li>
        <li class="border borber-2 border-gray-200 px-[10px] py-[6px] ">
          <a class="p-1">5</a>
        </li>
      </ul>
    </section>
  );
};

export default RecentPost;
