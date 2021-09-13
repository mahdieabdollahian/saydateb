import React, { useContext, useState } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { store } from "../../../../context/alert/AlerProvider";
import { loginstore } from "../../../../context/authProvider";
import style from "../accounting.module.scss";
import Accounting from "../accounting";
import http from "../../../../services/httpServices";
import { email, mobile } from "../../../shared/utils/regex";

const signUpByPhoneUrl = "account/signup/phone";
const signUpByEmailUrl = "account/signup/email";
const Register = () => {
  const { dispatch } = useContext(store);
  const [acceptRule, setAcceptRule] = useState(false);
  const { dispatch: loginDispatch } = useContext(loginstore);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const fields = [
    {
      id: "username",
      label: t("userName"),
      type: "text",
      icon: "icon-user",
      required: "true",
      validationType: "string",
      validations: [
        {
          type: "required",
          params: [t("required")],
        },
      ],
    },
    {
      id: "emailOrMobile",
      label: t("emailOrMobile"),
      type: "text",
      icon: "icon-iphone",
      required: "true",
      validationType: "string",
      validations: [
        {
          type: "required",
          params: [t("required")],
        },
      ],
    },
    {
      icon: "icon-lock",
      id: "password",
      label: t("password"),
      type: "password",
      required: "true",
      validationType: "string",
      validations: [
        {
          type: "required",
          params: [t("required")],
        },
      ],
    },
    {
      icon: "icon-lock",
      id: "password_confirmation",
      label: t("passwordConfirmation"),
      type: "password",
      required: "true",
      validationType: "string",
      validations: [
        {
          type: "required",
          params: [t("required")],
        },
      ],
    },
  ];

  const handleSubmit = async (values, { resetForm }) => {
    if (acceptRule) {
      try {
        setLoading(true);
        const { emailOrMobile } = values;
        const dataToSend = {
          ...values,
          phone: emailOrMobile.match(mobile) ? emailOrMobile : undefined,
          email: emailOrMobile.match(email) ? emailOrMobile : undefined,
          emailOrMobile: undefined,
        };
        const url = emailOrMobile.match(email)
          ? signUpByEmailUrl
          : signUpByPhoneUrl;
        const { data } = await http.post(url, dataToSend);
        loginDispatch({ type: "UUID", payload: { data: data.user } });
        setLoading(false);
        history.replace("/otp");
      } catch (err) {
        setLoading(false);
        dispatch({ type: "OPEN_ERROR", payload: t("error") });
        resetForm();
      }
    } else {
      dispatch({ type: "OPEN_ERROR", payload: t("acceptTheTules") });
    }
  };

  return (
    <Accounting
      formTitle={t("registerInSystem")}
      loading={loading}
      handleSubmit={handleSubmit}
      buttonText={t("register")}
      fields={fields}
    >
      <div className={style.more_action}>
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptRule}
              onChange={() => setAcceptRule(!acceptRule)}
              name="acceptRule"
              color="primary"
            />
          }
          label={t("acceptRules")}
        />
      </div>
      <div className={style.more_action}>
        <span>{t("signedUpBefore")}</span>
        <span className={style.link} onClick={() => history.push("/login")}>
          {" "}
          {t("loginPage")}{" "}
        </span>
      </div>
    </Accounting>
  );
};

export default Register;
