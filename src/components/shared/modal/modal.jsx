import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import styles from "./modal.module.scss";
import SuccessButton from "../buttons/successButton";

const Modal = ({
  open,
  handleClose,
  title,
  logo,
  handleAction,
  actionLabel,
  children,
}) => {
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={handleClose}
      classes={{ paper: styles.modal_paper }}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle classes={{ root: styles.title_root }}>
        <span className="icon-close" onClick={handleClose} />
        {logo && <img alt="navisa" src={logo} />}
        {title}
        <hr />
      </DialogTitle>
      <DialogContent classes={{ root: styles.content }}>
        {children}
      </DialogContent>
      <DialogActions classes={{ root: styles.action_root }}>
        {handleAction && (
          <SuccessButton onClick={handleAction}>{actionLabel}</SuccessButton>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default Modal;
