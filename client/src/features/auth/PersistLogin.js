import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { store } from "../../app/store";
import useCookie from "../../hooks/useCookie";
import { loginCheck } from "./authSlice";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refreshPage = useCookie();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const newAccessToken = async () => {
      try {
        await dispatch(loginCheck()).unwrap();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    store.login ? setIsLoading(true) : newAccessToken();
    // !auth?.accessToken ? newAccessToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading : ${isLoading}`);
    console.log(`aT : ${JSON.stringify(store.login)}`);
  }, [isLoading]);
  return (
    <>
      <Outlet /> <p>Loading ... </p>
      <Outlet />
    </>
  );
};

export default PersistLogin;
