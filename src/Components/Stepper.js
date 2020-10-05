import React, { useState, useEffect } from "react";
import { Steps, Button, message } from "antd";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";

import conf from "../Config/config";

import StepperForm from "../Components/Form";

export default function Stepper(props) {
  //STATE MACHINE
  const stepperMachine = Machine({
    initial: "idle",
    context: {
      submittedData: [],
    },
    states: {
      idle: {
        on: {
          NEXT: [
            {
              target: "idle",
              cond: (ctx, event) => event.data !== "",
            },
            {
              target: "error",
            },
          ],
          // ERROR: "error",
          SUBMIT: [
            {
              target: "loading",
              cond: (ctx, event) => event.data !== "",
            },
            {
              target: "error",
            },
          ],
        },
      },
      error: {
        on: {
          ERROR_HANDLED: "idle",
          SUBMIT: {
            target: "loading",
            cond: (ctx, event) => event.data !== "",
          },
        },
      },
      loading: {
        invoke: {
          id: "submitStepper",
          src: () => submitForm(),
          onDone: {
            target: "done",
            actions: assign({ submittedData: (ctx, event) => event.data }),
          },
          onError: {
            target: "error",
          },
        },
      },
      done: {
        type: "final",
      },
    },
  });

  const [machine, send] = useMachine(stepperMachine);
  console.log("MACHINE STATE : ", machine.value);

  const [current, setCurrent] = useState(0);

  //formData
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    console.log(conf);
  }, []);

  const { Step } = Steps;

  const { steps, lastButtonText, styles } = conf;

  const submitForm = () => {
    return new Promise((resolve, reject) => {
      if (formData != "" || formData != null) resolve(formData);
      else reject(formData);
    });
  };

  const next = (data, step) => {
    const Ncurrent = current + 1;
    setCurrent(Ncurrent);

    let compForm = [];

    data.forEach((value, key) => {
      compForm.push({ key, value });
    });

    formData.push({ step, compForm });
  };

  const prev = () => {
    const Pcurrent = current - 1;
    setCurrent(Pcurrent);
  };

  const done = (data, step) => {
    let compForm = [];

    data.forEach((value, key) => {
      compForm.push({ key, value });
    });

    formData.push({ step, compForm });
    console.log("Done,Submitted", formData);

    send({ type: "SUBMIT", data: { ...formData } });
  };

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={styles.stepsContent}>
        {steps[current].content}
        <StepperForm
          {...steps[current].formComponent}
          nextStep={(data, step) => {
            next(data, step);
          }}
          previousStep={() => {
            prev();
          }}
          finish={(data, step) => {
            done(data, step);
          }}
          currentStep={current}
          totalSteps={steps.length}
          submitText={lastButtonText}
        />

        {machine.matches("done") ? (
          message.success("Processing complete!")
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
