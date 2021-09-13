import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import DynamicForm from "../../shared/dynamicForm/dynamicForm";
import logo from "../../../assets/images/logo.png";
import sideImage from "../../../assets/images/bg.jpg";
import styles from "./accounting.module.scss";

const Accounting = ({
  fields,
  handleSubmit,
  loading,
  formTitle,
  buttonText,
  children,
}) => {
  return (
    <ReactCSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      <div className={styles.main_container}>
        <div className={styles.centered_container}>
          <div className={styles.form_container}>
            <div className={styles.logo_container}>
              <img alt="navisa" src={logo} />
              <span>{formTitle}</span>
            </div>

            <div className={styles.inputs}>
              <DynamicForm
                fields={fields}
                buttonText={buttonText}
                submit={handleSubmit}
                loading={loading}
              >
                {children}
              </DynamicForm>
            </div>
          </div>
          <div className={styles.sideImage}>
            <img alt="navisa" src={sideImage} />
          </div>
        </div>
      </div>
    </ReactCSSTransitionGroup>
  );
};

export default Accounting;
