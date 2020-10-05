import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";

export default function StepperForm(props) {
  const [fields, setFields] = useState([]);
  const [type, setType] = useState([]);
  const [required, setRequired] = useState([]);

  let currentFormData = new Map();

  useEffect(() => {
    console.log("FORM PROPS", props);
    setFields(props.fields);
    setType(props.type);
    setRequired(props.required);
  }, [props]);

  return (
    <>
      <Form
        name="stepperForm"
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        {props && props.fields ? (
          props.fields.map((formField, index) => (
            <Form.Item
              name={formField}
              label={formField.charAt(0).toUpperCase() + formField.slice(1)}
              rules={[
                {
                  required: props.required[index],
                  message: `Please input your ${formField}`,
                },
              ]}
            >
              <Input
                type={props.type[index]}
                onChange={(event) => {
                  currentFormData.set(formField, event.target.value);
                }}
              />
            </Form.Item>
          ))
        ) : (
          <span></span>
        )}
        <Form.Item>
          {props.currentStep === 0 && (
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                props.nextStep(currentFormData, props.currentStep);
              }}
            >
              Next
            </Button>
          )}
          {props.currentStep != 0 && props.currentStep < props.totalSteps - 1 && (
            <span>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  props.nextStep(currentFormData, props.currentStep);
                }}
              >
                Next
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                onClick={() => {
                  props.previousStep();
                }}
              >
                Previous
              </Button>
            </span>
          )}
          {props.currentStep === props.totalSteps - 1 && (
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                props.finish(currentFormData, props.currentStep);
              }}
            >
              {props.submitText}
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
}
