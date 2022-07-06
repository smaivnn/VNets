// attach the 인터샙터
//새로운 accesstoken 셋팅.
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";

const useAxiosPrivate = () => {
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          //만약 axiosPrivate를 사용하는데 Authorizstion이없으면 그건 첫 req라는 뜻이니까 이것을 넣어줌
          config.headers["Authorization"] = `Bearer ${userInfo.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response, //만약 아무 문제없이 response가 오면, 그냥 그대로 실행
      async (error) => {
        // 만약 토큰이 만료되면, 이 부분 실행.
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          //403:forbidden
          prevRequest.sent = true;
          // const newAccessToken = await refresh();
          // prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  });

  return axiosPrivate;
};

export default useAxiosPrivate;
