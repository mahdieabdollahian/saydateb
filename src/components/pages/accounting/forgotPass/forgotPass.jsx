import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import http from "../../../../services/httpServices";
import { store } from "../../../../context/alert/AlerProvider";
import { loginstore } from "../../../../context/authProvider";
import style from "../accounting.module.scss";
import Accounting from "../accounting";
import { email, mobile } from "../../../shared/utils/regex";

const forgotPassUrl = "account/forgot_password";
const ForgotPass = () => {
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
      id: "username",
      label: t("userName"),
      type: "text",
      icon: "icon-user",
      isRequired: "true",
    },
    {
      icon: "icon-iphone",
      id: "emailOrMobile",
      label: t("emailOrMobile"),
      type: "text",
      isRequired: "true",
    },
  ];

  const handleSubmit = async (values, { resetForm }) => {
    const { username, emailOrMobile } = values;
    if (username && emailOrMobile) {
      try {
        setLoading(true);
        const dataToSend = {
          username,
          phone: emailOrMobile.match(mobile) ? emailOrMobile : undefined,
          email: emailOrMobile.match(email) ? emailOrMobile : undefined,
        };
        const { data } = await http.post(forgotPassUrl, dataToSend);
        loginDispatch({
          type: "UUID",
          payload: { data: data.user },
        });
        setLoading(false);
        history.replace("/forgotPassOtp");
      } catch (err) {
        setLoading(false);
        dispatch({ type: "OPEN_ERROR", payload: t("defaultError") });
        resetForm();
      }
    }
  };

  return (
    <Accounting
      formTitle={t("forgotPassword")}
      loading={loading}
      handleSubmit={handleSubmit}
      buttonText={t("getUUID")}
      fields={fields}
    >
      <div className={style.more_action}>
        <span>{t("returnTo")}</span>
        <span className={style.link} onClick={() => history.push("/login")}>
          {" "}
          {t("loginPage")}{" "}
        </span>
      </div>
    </Accounting>
  );
};

export default ForgotPass;
