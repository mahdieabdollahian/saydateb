import views from "../../components/pages/inedx";

const DEFAULT_VIEW = {
  component: views.login,
  path: "/",
  isPrivate: false,
  exact: true,
};
const LOGIN_VIEW = {
  component: views.login,
  path: "/login",
  isPrivate: false,
};

const REGISTER_VIEW = {
  component: views.register,
  path: "/register",
  isPrivate: false,
};
const OTP_VIEW = {
  component: views.otp,
  path: "/otp",
  isPrivate: false,
};
const FORGOTPASSWORD_OTP_VIEW = {
  component: views.forgotPassowrdOtp,
  path: "/forgotPassOtp",
  isPrivate: false,
};

const FORGOT_PASSWORD_VIEW = {
  component: views.forgotPass,
  path: "/forgotPass",
  isPrivate: false,
};
const DASHBOARD_VIEW = {
  component: views.dashboard,
  path: "/dashboard",
  isPrivate: false,
};
const CARTABLE_VIEW = {
  component: views.cartable,
  path: "/cartable",
  isPrivate: true,
};
const NOTFOUND_VIEW = {
  component: views.notfound,
  path: "*",
  isPrivate: false,
  exact: true,
};

//  NOTICE : 'NOTFOUND_VIEW' MUST ALWAYS BE THE LAST ONE!!

export default [
  LOGIN_VIEW,
  REGISTER_VIEW,
  OTP_VIEW,
  FORGOTPASSWORD_OTP_VIEW,
  FORGOT_PASSWORD_VIEW,
  DASHBOARD_VIEW,
  DEFAULT_VIEW,
  CARTABLE_VIEW,
  NOTFOUND_VIEW,
];
