import React from "react";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import menuList from "./menuList";
import styles from "./menu.module.scss";

const Menu = ({ open }) => {
  return (
    <div className={styles.menuBox}>
      <div role="presentation" className={styles.menu}>
        <List classes={{ root: styles.navLinkRoot }}>
          {menuList.map(item => (
            <NavLink to={item.route} key={item.name}>
              <ListItem button>
                <span className={item.icon} />
                {open && <ListItemText primary={item.name} />}
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Menu;
