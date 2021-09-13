import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { getSavedData } from "../../services/storeService";
import NoAccess from "../../components/pages/notfound/noAccess";

const AppRoute = ({
  component: Component,
  path,
  exact,
  isPrivate,
  ...props
}) => {
  const isAuthenticated = () => {
    if (getSavedData("token")) {
      return true;
    }
    return false;
  };
  return (
    <Route
      path={path}
      exact={exact}
      render={prop =>
        isPrivate && !isAuthenticated() ? (
          <NoAccess />
        ) : (
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            <Component {...prop} />
          </ReactCSSTransitionGroup>
        )
      }
      {...props}
    />
  );
};
AppRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  isPrivate: PropTypes.bool,
};
AppRoute.defaultProps = {
  exact: false,
  isPrivate: false,
};

export default AppRoute;
