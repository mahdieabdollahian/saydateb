import React, { Suspense } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import theme from "./assets/style/mainStyle";
import AppRoute from "./config/routing/AppRoute";
import routes from "./config/routing/routes";
import { AuthProvider } from "./context/authProvider";
import Alert from "./components/shared/alert/alert";
import { AlertProvider } from "./context/alert/AlerProvider";
import Loading from "./components/shared/loading/loading";
import ServiceWorkerWrapper from "./config/serviceWorkerConfig/serviceWorkerWrapper";
import WithAxios from "./services/withAxios";

export const history = createBrowserHistory();

function App() {
  return (
    <AlertProvider>
      <WithAxios> </WithAxios>
      <AuthProvider>
        <Alert />
        <ServiceWorkerWrapper />
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <div className="App" />
          </ThemeProvider>
          <Suspense fallback={<Loading />}>
            <Switch>
              {routes.map(route => (
                <AppRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                  exact={route.exact}
                />
              ))}
            </Switch>
          </Suspense>
        </Router>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
