import "./styles.css";
import { Formik, Form, Field } from "formik";
import { FormikHelpers } from "formik/dist/types";
import { useState } from "react";
import { Step1 } from "../Steps/Step1";
import { Step2 } from "../Steps/Step2";
import { Step3 } from "../Steps/Step3";
import { Step4 } from "../Steps/Step4";

interface Values {
    name: string;
    email: string;
    phone: string;
    plan: string;
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

    const [selectedStep, setSelectedStep] = useState(1);
    const [formValues, setFormValues] = useState({
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
    });

    function handleStepSelection(): React.ReactNode {
        switch (selectedStep) {
            case 1: return <Step1 />
            case 2: return <Step2 selectedPlan={formValues.plan} yearly_payment={formValues.yearly_payment} setFormValues={setFormValues} />
            case 3: return <Step3 />
            case 4: return <Step4 />
            default: return null;
        }
    }

    return (
        <div className="form-container">
            <div className="form-box">
                <section className="step-track">
                    <ul>
                        {
                            steps.map((step) =>
                                <li>
                                    <div
                                        className={`${selectedStep === step.n ? "selected-step" : ""}`}
                                    >{step.n}</div>
                                    <div>
                                        <p>{`step ${step.n}`}</p>
                                        <p>{step.title}</p>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </section>
                <section className="form">
                    <div className="form-content-box">
                        <h2>{steps.find(item => item.n === selectedStep)?.subtitle}</h2>
                        <h3>{steps.find(item => item.n === selectedStep)?.text}</h3>
                        <Formik
                            initialValues={ formValues }
                            onSubmit={(
                                values: Values,
                                { setSubmitting }: FormikHelpers<Values>
                            ) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 500);
                            }}
                        >
                            <Form>
                                {handleStepSelection()}
                            </Form>

                        </Formik>
                        <div className="buttons-container">
                            <div>
                                {
                                    selectedStep !== 1 && <button onClick={() => selectedStep > 1 ? setSelectedStep(selectedStep - 1) : ""} className="back-btn">Go Back</button>
                                }
                            </div>
                            <div>
                                <button className="next-btn" onClick={() => selectedStep < 4 ? setSelectedStep(selectedStep + 1) : ""}>Next Step</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}