import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import style from "./dashboard.module.scss";
import Header from "./header/header";
import Menu from "../../shared/menu/menu";
import AppRoute from "../../../config/routing/AppRoute";
import Loading from "../../shared/loading/loading";
import innerRoutes from "../../../config/routing/innerRoutes";

const Dashboard = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(!open);
  };
  return (
    <div className={style.root}>
      <Drawer
        anchor="right"
        variant="permanent"
        className={clsx(style.drawer, {
          [style.drawerOpen]: open,
          [style.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [style.drawerOpen]: open,
            [style.drawerClose]: !open,
          }),
        }}
      >
        <div className={style.headertitle}>
          <IconButton onClick={handleDrawerClose}>
            <span className={`icon-bookmark ${style.icon}`} />
            {open && <span className={style.title}> {t("navisa")}</span>}
          </IconButton>
        </div>
        <Menu open={open} />
      </Drawer>
      <main className={style.content}>
        <Header />
        <div className={style.mainContent}>
          <Suspense fallback={<Loading />}>
            <Switch>
              {innerRoutes.map(route => (
                <AppRoute
                  key={route.path}
                  path={`/dashboard${route.path}`}
                  component={route.component}
                  isPrivate={route.isPrivate}
                  exact={route.exact}
                />
              ))}
            </Switch>
          </Suspense>
        </div>

        <div className={style.footer}>
          <span>طراحی و توسعه عصر گویش پرداز</span>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
