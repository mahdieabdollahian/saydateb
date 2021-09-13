import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import style from "./counter.module.scss";
import SuccessButton from "../buttons/successButton";
import { store } from "../../../context/alert/AlerProvider";

const Counter = ({ duration, handleResendCode }) => {
  const [fullTime, setFullTime] = useState();
  const { dispatch } = useContext(store);
  const [time, setTime] = useState(duration);
  const [retry, setRetry] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const startTimer = () => {
    setRetry(false);
    let seconds = time / 1000;
    let minutes = parseInt((seconds / 60).toString(), 10);
    seconds = parseInt(seconds, 10) % 60;
    const secondString = seconds.toString().padStart(2, "0");
    minutes = parseInt(minutes, 10) % 60;
    const minuteString = minutes.toString().padStart(2, "0");

    if (seconds === 60) {
      setFullTime(`${minuteString} : 00`);
    } else {
      setFullTime(`${minuteString} : ${secondString}`);
    }
    if (time - 1000 >= 0) {
      setTime(time - 1000);
    } else {
      setRetry(true);
    }
  };
  const retryCode = async () => {
    try {
      setLoading(true);
      await handleResendCode();
      setRetry(true);
      setLoading(false);
      setTime(duration);
    } catch (err) {
      setLoading(false);
      dispatch({ type: "OPEN_ERROR", payload: t("errorInCodeResend") });
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => startTimer(), 1000);
    return () => clearInterval(timerId);
  });
  return (
    <div className={style.counter_container}>
      {!retry && (
        <span className={style.counter}>
          <span>{fullTime}</span>
          {fullTime && <span>{t("second")}</span>}
        </span>
      )}
      {retry && (
        <div className={style.retry}>
          <SuccessButton
            type="button"
            disabled={loading}
            label={t("retry")}
            onClick={() => retryCode()}
          />
        </div>
      )}
    </div>
  );
};

export default Counter;
