import { Avatar, Menu, MenuItem } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import style from "./header.module.scss";
import avatar from "../../../../assets/images/avatar.jpg";
import { loginstore } from "../../../../context/authProvider";
import ChargeAccountModal from "./chargeAccountModal/chargeAccountModal";
// import Drawer from "@material-ui/core/Drawer";
// import styles from "./header.module.scss";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { dispatch: loginDispatch } = useContext(loginstore);
  const history = useHistory();
  const { t } = useTranslation();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const [openSearch, setOpenSearch] = React.useState(false);
  const handleCloseModal = () => {
    setOpenSearch(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    loginDispatch({ type: "LOGOUT" });
    history.push("/login");
  };
  const handleChargeAccount = () => {
    setOpenSearch(true);
  };

  return (
    <div className={style.header_container}>
      <ChargeAccountModal
        openSearch={openSearch}
        handleClose={handleCloseModal}
      />
      <div className={style.left_side}>
        <div className={style.charge_account} onClick={handleChargeAccount}>
          <span className="icon-coin" />
          <span>{t("chargeAccount")}</span>
        </div>

        <Avatar
          classes={{
            root: style.larg_avatar,
          }}
          alt="Remy Sharp"
          src={avatar}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          classes={{ paper: style.menu, list: style.listItem }}
        >
          <MenuItem onClick={handleClose}>
            <span className="icon-home" />
            {t("dashboard")}
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <span className="icon-user" />
            {t("profile")}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleLogout();
            }}
          >
            <span className="icon-logout" />
            {t("logout")}
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
export default Header;
