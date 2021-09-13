import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { store } from "../../../context/alert/AlerProvider";
import styles from "./alert.module.scss";

const Alert = () => {
  const { state, dispatch } = useContext(store);
  const { open, message, type } = state || {};
  const handleClose = () => {
    dispatch({ type: "CLOSE" });
  };

  return (
    <>
      <Snackbar
        className={styles[type]}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <SnackbarContent
          classes={{ action: styles.action, message: styles.message }}
          message={
            <>
              <span className={`${styles.icon} icon-${type}`} />
              <span>{message}</span>
            </>
          }
          action={
            <IconButton
              classes={{ label: styles.label }}
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <span className="icon-close" />
            </IconButton>
          }
        />
      </Snackbar>
    </>
  );
};
export default Alert;
