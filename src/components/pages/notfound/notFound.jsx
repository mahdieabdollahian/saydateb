import React from "react";
import { useTranslation } from "react-i18next";
import SuccessButton from "../../shared/buttons/successButton";
import styles from "./notFound.module.scss";
import notFoundImg from "../../../assets/images/404.jpg";

const NotFound = ({ history }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.mainImage}>
        <img alt="404" src={notFoundImg} />
      </div>
      <div className={styles.explanation}>
        <p>{t("sorry")}</p>
        <p>{t("notFoundExp")}</p>
        <p>
          Error Code :<span>404</span>{" "}
        </p>
      </div>
      <SuccessButton
        label={t("goToLogin")}
        classes={styles.button}
        onClick={() => history.replace("/login")}
      />
    </div>
  );
};

export default NotFound;
