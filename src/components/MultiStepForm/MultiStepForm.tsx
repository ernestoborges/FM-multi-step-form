import "./styles.css";
import { Formik, Form} from "formik";
import { FormikConfig, FormikValues } from "formik/dist/types";
import React, { useContext } from "react";
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
                        <h2>{steps.find(item => item.n === currentStep)?.subtitle}</h2>
                        <h3>{steps.find(item => item.n === currentStep)?.text}</h3>
                        <FormikStepper
                            initialValues={
                                {
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
                            }
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
    const currentChild = childrenArray[currentStep ? currentStep - 1 : 0];

    return (
        <>
            <Formik {...props} onSubmit={(values: FormikValues) => {
                if (currentStep < childrenArray.length - 1) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                    }, 500);
                }
            }}>
                <Form id="formik">{currentChild}</Form>
            </Formik>
            <div className={`buttons-container ${currentStep === 5 ? "hidden" : ""}`}>
                <div>
                    {
                        currentStep !== 1 && <button onClick={
                            () => currentStep > 1
                                ? setCurrentStep(currentStep - 1)
                                : null
                        } className="back-btn">Go Back</button>
                    }
                </div>
                <div>
                    <button form="formik" type="submit" className="next-btn">
                        {currentStep === childrenArray.length - 1 ? "Confirm" : "Next Step"}
                    </button>
                </div>
            </div>
        </>
    )
}