import React from "react";
import axios from "../api/axios";

const useCookie = () => {
  const refreshPage = async () => {
    const response = await axios.get("", {});
    return response.data;
  };
  return refreshPage;
};

export default useCookie;
