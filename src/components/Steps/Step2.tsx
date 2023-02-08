import "./styles.css"
import { Field, useFormikContext } from "formik";
import { Values } from "../MultiStepForm/MultiStepForm";

export function Step2() {

    const plans = [
        { name: "Arcade", month: 9, year: 90 },
        { name: "Advanced", month: 12, year: 120 },
        { name: "Pro", month: 15, year: 150 }
    ]

    const { setFieldValue, values } = useFormikContext<Values>();

    return (
        <div className="form-step-content-wrapper plan-selection">
            <div className="plan-list" role="group">
                {
                    plans.map((plan, index) => (
                        <label key={index} className={`${values.plan === plan.name ? "selected-plan" : ""}`} >
                                <div>
                                    <img src={`/images/icon-${plan.name.toLowerCase()}.svg`} />
                                </div>
                                <div>
                                    <p>{plan.name}</p>
                                    <p>{`$${values.yearly_payment ? plan.year : plan.month}/${values.yearly_payment ? "yr" : "mo"}`}</p>
                                    {values.yearly_payment && <p>2 months free</p>}
                                </div>
                                <Field type="radio" name="plan" value={plan.name} className="hidden"/>
                        </label>
                    ))
                }
            </div>
            <div
                className="switcher-container"
            >
                <p
                    className={`${!values.yearly_payment ? "selected-payment" : ""}`}
                    onClick={() => setFieldValue("yearly_payment", false )}
                >Monthly</p>
                <label className="switch">
                    <Field
                        id="switch-input"
                        type="checkbox"
                        name="yearly_payment"
                        checked={values.yearly_payment}
                        readOnly
                    />
                    <span className="slider round"></span>
                </label>
                <p
                    className={`${values.yearly_payment ? "selected-payment" : ""}`}
                    onClick={() => setFieldValue("yearly_payment", true )}
                >Yearly</p>
            </div>
        </div>
    )
}