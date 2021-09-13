import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import SuccessButton from "../../shared/buttons/successButton";
import styles from "./notFound.module.scss";
import notFoundImg from "../../../assets/images/401.jpg";

const NoAccess = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.mainImage}>
        <img alt="401" src={notFoundImg} />
      </div>
      <div className={styles.explanation}>
        <p>{t("sorry")}</p>
        <p>{t("NoAccessExp")}</p>
        <p>
          Error Code :<span>401</span>
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

export default NoAccess;
