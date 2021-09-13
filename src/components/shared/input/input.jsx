import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import styles from "./input.module.scss";
import * as regex from "../utils/regex";

const Input = ({
  name,
  label,
  error,
  classes,
  labelclass,
  icon,
  onChange,
  type,
  width,
  maxLen,
  isRequired,
  unit,
  ...rest
}) => {
  const onInputHandler = event => {
    event.preventDefault();
    if (regex[type]) {
      const rgx = regex[type];
      const value = event.target.value.replace(rgx, "");
      onChange(name, value);
    } else {
      onChange(name, event.target.value);
    }
  };

  return (
    <Grid item xs={width} className={`${styles.fieldSet}  ${classes} `}>
      <label htmlFor={name}>
        {label}
        {isRequired && "*"}
      </label>
      {icon && <span className={`${icon}`} />}
      {type === "password" && (
        <TextField
          id={name}
          name={name}
          variant="outlined"
          onChange={onInputHandler}
          type="password"
          InputLabelProps={{
            classes: {
              root: labelclass || styles.root,
              focused: labelclass,
              formControl: labelclass || styles.muiInputLabel,
              shrink: styles.shrinkLabel,
            },
          }}
          {...rest}
          inputProps={{
            maxLength: 50,
          }}
        />
      )}
      {type !== "password" && (
        <TextField
          id={name}
          name={name}
          variant="outlined"
          onChange={onInputHandler}
          InputLabelProps={{
            classes: {
              root: labelclass || styles.root,
              focused: labelclass,
              formControl: labelclass || styles.muiInputLabel,
              shrink: styles.shrinkLabel,
            },
          }}
          type="text"
          {...rest}
          inputProps={{
            maxLength: 50,
          }}
        />
      )}

      {error && <div className={styles.errorText}>{error}</div>}
    </Grid>
  );
};
Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.number,
};
Input.defaultProps = {
  error: "",
  type: "text",
  width: 12,
};
export default Input;
