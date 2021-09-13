import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./button.module.scss";

const SuccessButton = ({
  label,
  children,
  buttonType,
  loading,
  classes,
  type,
  ...rest
}) => {
  return (
    <>
      <Button
        className={styles.button}
        classes={{ root: classes }}
        type={type || "submit"}
        variant="contained"
        {...rest}
      >
        {label}
        {children}
        {loading && (
          <CircularProgress size={25} className={styles.buttonProgress} />
        )}
      </Button>
    </>
  );
};
export default SuccessButton;
