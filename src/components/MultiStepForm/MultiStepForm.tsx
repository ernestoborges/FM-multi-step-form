import "./styles.css";
import { Formik, Form, useFormikContext, FormikContext } from "formik";
import { FormikConfig, FormikValues } from "formik/dist/types";
import React, { useContext, useRef, useState } from "react";
import { Step1 } from "../Steps/Step1";
import { Step2 } from "../Steps/Step2";
import { Step3 } from "../Steps/Step3";
import { Step4 } from "../Steps/Step4";
import { SubmitPage } from "../Steps/SubmitPage";
import { StepBar } from "../StepBar/StepBar";
import StepContext from "../../context/StepProvider";

export interface Values {
    name: string;
    email: string;
    phone: string;
    plan: "Arcade" | "Advanced" | "Pro";
    yearly_payment: boolean;
    addons: {
        online_service: boolean;
        larger_storage: boolean;
        cuztomizeble_profile: boolean;
    }
}

const validate = (values: FormikValues) => {
    const errors: any = {};

    // Name
    if (!values.name) {
        errors.name = 'This field is required';
    }
    // Email
    if (!values.email) {
        errors.email = 'This field is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email';
    }

    // Phone number
    if (!values.phone) {
        errors.phone = 'This field is required';
    } else if (!/^\d{10,}$/i.test(values.phone)) {
        errors.phone = 'Invalid phone number';
    }

    return errors;
}

export const initialValues = {
    name: "",
    email: "",
    phone: "",
    plan: "Arcade",
    yearly_payment: false,
    addons: {
        online_service: false,
        larger_storage: false,
        cuztomizeble_profile: false
    }
}

export function MultiStepForm() {

    let steps = [
        { n: 1, title: "your info", subtitle: "personal info", text: "please provide your name, email address and phone number." },
        { n: 2, title: "select plan", subtitle: "select your plan", text: "you have the option of monthly or yearly billing." },
        { n: 3, title: "add-ons", subtitle: "pick add-ons", text: "add-ons help enchance your gaming experience." },
        { n: 4, title: "summary", subtitle: "finishing up", text: "double-check everything looks OK before confirming." },
    ]

    const currentStep = useContext(StepContext)!.selectedStep;

    return (
        <div className="form-container">
            <div className="form-box">
                <StepBar steps={steps} />
                <section className="form">
                    <div className="form-content-box">
                        <h2>{steps.find(item => item.n === currentStep + 1)?.subtitle}</h2>
                        <h3>{steps.find(item => item.n === currentStep + 1)?.text}</h3>
                        <FormikStepper
                            initialValues={initialValues}
                            onSubmit={() => { }}
                        >
                            <Step1 />
                            <Step2 />
                            <Step3 />
                            <Step4 />
                            <SubmitPage />
                        </FormikStepper>
                    </div>
                </section>
            </div>
        </div>
    )
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {

    const currentStep = useContext(StepContext)!.selectedStep;
    const setCurrentStep = useContext(StepContext)!.setSelectedStep;

    const childrenArray = React.Children.toArray(children as React.ReactNode[]);
    const currentChild = childrenArray[currentStep];

    return (
        <Formik {...props}
            validate={validate}
            onSubmit={(values, helpers) => {
                if (currentStep === childrenArray.length - 2) {
                    setCurrentStep(currentStep + 1);
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        helpers.resetForm({});
                    }, 500);
                } else {
                    setCurrentStep(currentStep + 1);
                    helpers.setTouched({});
                }
            }}
        >
            <Form id="formik">
                {currentChild}
                <div className={`buttons-container`}>
                    <div>
                        {
                            currentStep > 0 &&
                            currentStep < childrenArray.length - 1 &&
                            <button
                                type="button"
                                onClick={
                                    () => currentStep > 0
                                        ? setCurrentStep(currentStep - 1)
                                        : null
                                } className="back-btn">
                                Go Back
                            </button>
                        }
                    </div>
                    <div>
                        {currentStep === childrenArray.length - 1
                            ? <button type="button" className="reset-btn" onClick={() => window.location.reload()}>
                                New subscription
                            </button>
                            : <button type="submit" form="formik" className="next-btn">
                                {currentStep === childrenArray.length - 2 ? "Confirm" : "Next Step"}
                            </button>
                        }
                    </div>
                </div>
            </Form>
        </Formik>
    )
}