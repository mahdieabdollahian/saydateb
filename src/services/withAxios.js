import { useContext, useMemo } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { store } from "../context/alert/AlerProvider";

const WithAxios = () => {
  const { dispatch } = useContext(store);
  const { t } = useTranslation();

  useMemo(() => {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (
          error &&
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          dispatch({ type: "OPEN_ERROR", payload: t("401Err") });
          setTimeout(() => {
            window.location.pathname = "/login";
          }, 3000);
          return Promise.reject(error.response.data);
        } else if (error && error.response && error.response.data) {
          return Promise.reject(error.response.data);
        } else {
          return Promise.reject(error);
        }
      }
    );
  });

  return null;
};

export default WithAxios;
