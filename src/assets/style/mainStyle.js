import { createMuiTheme } from "@material-ui/core/styles";
import { faIR } from "@material-ui/core/locale";

import "./iconStyle.scss";

const theme = createMuiTheme(
  {
    direction: "rtl",
    typography: {
      fontSize: 16,
    },
  },
  faIR
);
export default theme;
