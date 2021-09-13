import views from "../../components/pages/inedx";

const DEFAULT_VIEW = {
  component: views.cartable,
  path: "/",
  isPrivate: false,
  exact: true,
};
const CARTABLE_VIEW = {
  component: views.cartable,
  path: "/cartable",
  isPrivate: false,
};
const NOTFOUND_VIEW = {
  component: views.notfound,
  path: "*",
  isPrivate: false,
  exact: true,
};

//  NOTICE : 'NOTFOUND_VIEW' MUST ALWAYS BE THE LAST ONE!!

export default [DEFAULT_VIEW, CARTABLE_VIEW, NOTFOUND_VIEW];
