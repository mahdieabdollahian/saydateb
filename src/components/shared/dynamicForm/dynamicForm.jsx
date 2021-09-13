import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import Input from "../input/input";
import Counter from "../counter/counter";
import SuccessButton from "../buttons/successButton";

const DynamicForm = ({
  fields,
  buttonType,
  buttonText,
  submit,
  loading,
  saveIcon,
  children,
}) => {
  const renderFormElements = props =>
    fields.map(item => {
      const fieldMap = {
        text: Input,
        password: Input,
        number: Input,
        amount: Input,
        counter: Counter,
      };
      const Component = fieldMap[item.type];
      const error = Object.prototype.hasOwnProperty.call(props.errors, item.id)
        ? props.errors[item.id]
        : "";
      if (item.type && item.type === "date") {
        return (
          <Component
            key={item.id}
            label={item.label}
            name={item.id}
            type={item.type}
            classes={item.classes}
            labelclass={item.labelclass}
            icon={item.icon}
            error={props.touched[item.id] ? error : ""}
            width={item.width}
            value={props.values[item.id]}
            isRequired={item.required}
            onChange={value => {
              props.setFieldValue(item.id, value);
            }}
          />
        );
      }
      if (item.type && item.type === "select") {
        return (
          <Component
            key={item.id}
            label={item.label}
            name={item.id}
            type={item.type}
            classes={item.classes}
            labelclass={item.labelclass}
            icon={item.icon}
            error={props.touched[item.id] ? error : ""}
            value={props.values[item.id] || ""}
            isRequired={item.required}
            onChange={props.handleChange}
            options={item.options}
            selectValue={item.selectValue}
          />
        );
      }
      if (item.type && item.type === "counter") {
        return (
          <Component
            key={item.id}
            classes={item.classes}
            width={item.width}
            duration={item.duration}
            handleResendCode={item.handleResendCode}
          />
        );
      } else {
        return (
          <Component
            key={item.id}
            label={item.label}
            name={item.id}
            type={item.type}
            classes={item.classes}
            labelclass={item.labelclass}
            onBlur={props.handleBlur}
            value={props.values[item.id] || ""}
            isRequired={item.required}
            onChange={(name, val) => props.setFieldValue(name, val)}
            icon={item.icon}
            width={item.width}
            error={props.touched[item.id] ? error : ""}
            placeholder={item.placeholder}
          />
        );
      }
    });

  const getInitialValues = inputs => {
    const initialValues = {};
    inputs.forEach(field => {
      if (!initialValues[field.id]) {
        initialValues[field.id] = field.value;
      }
    });
    return initialValues;
  };
  function createYupSchema(schema, config) {
    const { id, validationType, validations = [] } = config;
    if (!Yup[validationType]) {
      return schema;
    }
    let validator = Yup[validationType]();
    validations.forEach(validation => {
      const { params, type } = validation;
      if (!validator[type]) {
        return;
      }
      validator = validator[type](params).nullable();
    });
    schema[id] = validator;
    return schema;
  }
  const initialValues = getInitialValues(fields);
  const yepSchema = fields.reduce(createYupSchema, {});
  const validations = Yup.object().shape(yepSchema);
  return (
    <Formik
      validationSchema={validations}
      initialValues={initialValues}
      onSubmit={submit}
    >
      {props => (
        <form onSubmit={props.handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            {renderFormElements(props)}
            {children}
            <SuccessButton
              buttonType={buttonType}
              label={buttonText}
              loading={loading}
              icon={saveIcon}
              disabled={!(props.isValid && props.dirty)}
            />
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default DynamicForm;
