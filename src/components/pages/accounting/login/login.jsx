import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import http from "../../../../services/httpServices";
import { store } from "../../../../context/alert/AlerProvider";
import { loginstore } from "../../../../context/authProvider";
import Accounting from "../accounting";
import style from "../accounting.module.scss";

const loginUrl = "account/login";
const Login = props => {
  const { dispatch } = useContext(store);
  const { dispatch: loginDispatch } = useContext(loginstore);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    loginDispatch({ type: "LOGOUT" });
  }, []);
  const fields = [
    {
      id: "userName",
      label: t("emailOrMobile"),
      type: "number",
      icon: "icon-iphone",
    },
    {
      icon: "icon-lock",
      id: "password",
      label: t("password"),
      type: "password",
    },
  ];

  const handleSubmit = async (values, { resetForm }) => {
    const { userName, password } = values;
    if (userName && password) {
      try {
        setLoading(true);
        const { data } = await http.post(loginUrl, {
          username_or_phone_or_email: userName,
          password,
        });
        loginDispatch({
          type: "LOGIN",
          payload: { token: data.token, data },
        });
        setLoading(false);
        const { state } = props.location;
        const url = state ? state.from.pathname : "/dashboard/cartable";
        history.replace(url);
      } catch (err) {
        setLoading(false);
        dispatch({ type: "OPEN_ERROR", payload: t("loginError") });
        resetForm();
      }
    }
  };

  return (
    <Accounting
      formTitle={t("loginToSystem")}
      loading={loading}
      handleSubmit={handleSubmit}
      buttonText={t("login")}
      fields={fields}
    >
      <div className={style.more_action}>
        <span>{t("ifYouDontRegister")}</span>
        <span className={style.link} onClick={() => history.push("/register")}>
          {" "}
          {t("register")}{" "}
        </span>
        <span>{t("do")}</span>
      </div>
      <div className={style.more_action}>
        <span
          className={style.link}
          onClick={() => history.push("/forgotPass")}
        >
          {t("forgotPassword")}
        </span>
      </div>
    </Accounting>
  );
};

export default Login;
