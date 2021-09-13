import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { store } from "../../../../context/alert/AlerProvider";
import Accounting from "../accounting";
import http from "../../../../services/httpServices";
import { loginstore } from "../../../../context/authProvider";

const changePasswordUrl = "account/change_forgotten_password";
const resendVerificationCodeUrl = "/account/resend_veification_code/phone";

const ForgotPassOtp = props => {
  const { dispatch } = useContext(store);
  const { state: loginState, dispatch: loginDispatch } = useContext(loginstore);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const fields = [
    {
      id: "otp",
      label: t("enterUUID"),
      placeholder: t("sixDigitCode"),

      type: "number",
      icon: "icon-envelop",
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
      id: "counter",
      type: "counter",
      duration: "120000",
      handleResendCode,
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
  async function handleResendCode() {
    await http.post(resendVerificationCodeUrl, { id: loginState.data.id });
  }

  useEffect(() => {
    if (!loginState || !loginState.data) {
      history.replace("/forgotPass");
    }
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const { id } = loginState.data;
      const { data } = await http.post(changePasswordUrl, { ...values, id });
      loginDispatch({
        type: "LOGIN",
        payload: { token: data.user.token, data },
      });
      setLoading(false);
      const { state } = props.location;
      const url = state ? state.from.pathname : "/dashboard";
      history.replace(url);
    } catch (err) {
      setLoading(false);
      dispatch({ type: "OPEN_ERROR", payload: t("error") });
      resetForm();
    }
  };

  return (
    <Accounting
      formTitle={t("confirmLogin")}
      loading={loading}
      handleSubmit={handleSubmit}
      buttonText={t("confirm")}
      fields={fields}
    />
  );
};

export default ForgotPassOtp;
