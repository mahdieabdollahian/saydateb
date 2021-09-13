import { lazy } from "react";

const login = lazy(() => import("./accounting/login/login"));
const forgotPass = lazy(() => import("./accounting/forgotPass/forgotPass"));
const register = lazy(() => import("./accounting/register/register"));
const otp = lazy(() => import("./accounting/otp/otp"));
const forgotPassowrdOtp = lazy(() =>
  import("./accounting/forgotPassOtp/forgotPassOtp")
);
const dashboard = lazy(() => import("./dashboard/dashboard"));
const cartable = lazy(() => import("./cartable/cartable"));
const notfound = lazy(() => import("./notfound/notFound"));

export default {
  login,
  dashboard,
  cartable,
  forgotPass,
  register,
  otp,
  forgotPassowrdOtp,
  notfound,
};
