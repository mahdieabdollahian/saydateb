import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { store } from "../../../../context/alert/AlerProvider";
import Accounting from "../accounting";
import http from "../../../../services/httpServices";
import { loginstore } from "../../../../context/authProvider";

const signUpUrl = "account/verify_signup";
const resendVerificationCodeUrl = "/account/resend_veification_code/phone";

const Otp = () => {
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
  ];

  useEffect(() => {
    if (!loginState || !loginState.data) {
      history.replace("/register");
    }
  }, []);
  async function handleResendCode() {
    await http.post(resendVerificationCodeUrl, { id: loginState.id });
  }
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const { id } = loginState.data;
      const { data } = await http.post(signUpUrl, { ...values, id });
      loginDispatch({
        type: "LOGIN",
        payload: { token: data.user.token, data },
      });
      setLoading(false);
      history.replace("/dashboard/cartable");
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

export default Otp;
