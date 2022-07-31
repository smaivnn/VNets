import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import { getUserInfo } from "../auth/authSlice";

const EDITING_USER_INFO_URL = "/user";

const EditUserInfo = () => {
  const UserInfo = useSelector(getUserInfo);

  const [USER_ID, setUSER_ID] = useState(UserInfo?.USER_ID);
  const [USER_studentID, setUSER_studentID] = useState(
    UserInfo?.USER_studentID
  );
  const [Nickname, setNickname] = useState(UserInfo?.USER_NICKNAME);
  const [Tag1, setTag1] = useState(UserInfo?.USER_PROFILE[0]);
  const [Tag2, setTag2] = useState(UserInfo?.USER_PROFILE[1]);
  const [Tag3, setTag3] = useState(UserInfo?.USER_PROFILE[2]);
  const [Tag4, setTag4] = useState(UserInfo?.USER_PROFILE[3]);
  const [Link1, setLink1] = useState(UserInfo?.USER_PROFILE[4]);
  const [Link2, setLink2] = useState(UserInfo?.USER_PROFILE[5]);
  const [Comment, setComment] = useState(UserInfo?.USER_PROFILE[6]);

  useEffect(() => {
    setUSER_ID(UserInfo?.USER_ID);
    setUSER_studentID(UserInfo?.USER_studentID);
    setNickname(UserInfo?.USER_NICKNAME);
    setTag1(UserInfo?.USER_PROFILE[0]);
    setTag2(UserInfo?.USER_PROFILE[1]);
    setTag3(UserInfo?.USER_PROFILE[2]);
    setTag4(UserInfo?.USER_PROFILE[3]);
    setLink1(UserInfo?.USER_PROFILE[4]);
    setLink2(UserInfo?.USER_PROFILE[5]);
    setComment(UserInfo?.USER_PROFILE[6]);
  }, [UserInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirm = window.confirm(`프로필을 수정하시겠습니까 ?`);
      if (confirm) {
        await axios.put(`${EDITING_USER_INFO_URL}/edit/:${USER_studentID}`, {
          USER_ID,
          USER_NICKNAME: Nickname,
          USER_PROFILE: {
            Tag1,
            Tag2,
            Tag3,
            Tag4,
            Link1,
            Link2,
            Comment,
          },
        });
        window.location.reload();
      }
    } catch (err) {
      if (err) {
        console.log("No Server Response", err);
      }
    }
  };

  return (
    <section className="w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-neutral-100 border border-1 border-neutral-300 p-10 rounded-sm"
      >
        <h1 className="text-2xl mb-5">Edit Profile</h1>
        {/* <--- Nickname ---> */}
        <label htmlFor="Nickname" className="inline-block mb-1 ">
          Nickname :
        </label>
        <input
          className="w-full bg-inherit text-2xl mb-8 border-b-2 border-b-neutral-300 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
          type="text"
          id="Nickname"
          autoComplete="off"
          onChange={(e) => setNickname(e.target.value)}
          value={Nickname || ""}
          required
        />

        {/* <--- Hash Tag ---> */}
        <div className="flex justify-end">
          <div>
            <div className="inline-block mr-3">
              <label htmlFor="Tag1" className="inline-block">
                Tag 1 :&nbsp;
              </label>
              <input
                className="w-[200px] bg-inherit border-b-neutral-300 text-xl mb-8 border-b-2 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
                type="text"
                id="Tag1"
                onChange={(e) => setTag1(e.target.value)}
                value={Tag1 || ""}
                required
              />
            </div>
            <div className="inline-block">
              <label htmlFor="Tag2" className="inline-block ">
                Tag 2 :&nbsp;
              </label>
              <input
                className="w-[200px] bg-inherit border-b-neutral-300 text-xl mb-8 border-b-2 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
                type="text"
                id="Tag2"
                onChange={(e) => setTag2(e.target.value)}
                value={Tag2 || ""}
                required
              />
            </div>
          </div>
          <div>
            <div className="inline-block mr-3">
              <label htmlFor="Tag3" className="inline-block ">
                Tag 3 :&nbsp;
              </label>
              <input
                className="w-[200px] bg-inherit border-b-neutral-300 text-xl mb-8 border-b-2 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
                type="text"
                id="Tag3"
                onChange={(e) => setTag3(e.target.value)}
                value={Tag3 || ""}
                required
              />
            </div>
            <div className="inline-block">
              <label htmlFor="Tag4" className="inline-block ">
                Tag 4 :&nbsp;
              </label>
              <input
                className="w-[200px] bg-inherit border-b-neutral-300 text-xl mb-8 border-b-2 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
                type="text"
                id="Tag4"
                onChange={(e) => setTag4(e.target.value)}
                value={Tag4 || ""}
                required
              />
            </div>
          </div>
        </div>

        {/* <--- Line Comment ---> */}
        <label htmlFor="Comment" className="inline-block w-[200px] mb-1">
          Comment :
        </label>
        <input
          className="w-full bg-inherit border-b-neutral-300 text-md mb-8 border-b-2 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
          type="text"
          id="Comment"
          autoComplete="off"
          onChange={(e) => setComment(e.target.value)}
          value={Comment || ""}
          required
        />

        {/* <--- SNS Link ---> */}
        <label htmlFor="Link1" className="inline-block w-[200px] mb-1">
          Github :
        </label>
        <input
          className="w-full bg-inherit border-b-neutral-300 text-md mb-8 border-b-2 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
          type="text"
          id="Link1"
          autoComplete="off"
          onChange={(e) => setLink1(e.target.value)}
          value={Link1 || ""}
          required
        />

        <label htmlFor="Link2" className="inline-block w-[200px] mb-1">
          Instagram :
        </label>
        <input
          className="w-full bg-inherit border-b-neutral-300 text-md mb-8 border-b-2 placeholder:italic focus-within:border-indigo-500 focus:outline-none"
          type="text"
          id="Link2"
          autoComplete="off"
          onChange={(e) => setLink2(e.target.value)}
          value={Link2 || ""}
          required
        />

        <button
          type="submit"
          className="transform text-2xl w-full rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
        >
          Edit !
        </button>
      </form>
    </section>
  );
};

export default EditUserInfo;
