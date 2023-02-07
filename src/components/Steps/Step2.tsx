import "./styles.css"
import { Values } from "../MultiStepForm/MultiStepForm";

interface Props {
    formValues: Values;
    setFormValues: Function;
}

export function Step2({ formValues, setFormValues }: Props) {
    
    const plans = [
        { name: "Arcade", month: 9, year: 90 },
        { name: "Advanced", month: 12, year: 120 },
        { name: "Pro", month: 15, year: 150 }
    ]

    return (
        <div className="form-step-content-wrapper plan-selection">
            <ul className="plan-list">
                {
                    plans.map((plan) => (
                        <li
                            className={`${formValues.plan == plan.name ? "selected-plan" : ""}`}
                            onClick={() => setFormValues((prev: [key: string]) => ({ ...prev, plan: plan.name }))}
                        >
                            <div>
                                <img src={`src/assets/images/icon-${plan.name}.svg`} />
                            </div>
                            <div>
                                <p>{plan.name}</p>
                                <p>{`$${formValues.yearly_payment ? plan.year : plan.month}/${formValues.yearly_payment ? "yr" : "mo"}`}</p>
                                {formValues.yearly_payment && <p>2 months free</p>}
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div
                className="switcher-container"
            >
                <p 
                    className={`${!formValues.yearly_payment ? "selected-payment" : ""}`}
                    onClick={() => setFormValues((prev: typeof setFormValues) => ({ ...prev, yearly_payment: false}))}
                >Monthly</p>
                <label className="switch">
                    <input
                        id="switch-input"
                        type="checkbox"
                        checked={formValues.yearly_payment}
                        readOnly
                        onClick={() => setFormValues((prev: [key: string]) => ({ ...prev, yearly_payment: formValues.yearly_payment ? false : true }))}
                    />
                    <span className="slider round"></span>
                </label>
                <p 
                    className={`${formValues.yearly_payment ? "selected-payment" : ""}`}
                    onClick={() => setFormValues((prev: [key: string]) => ({ ...prev, yearly_payment: true}))}
                >Yearly</p>

            </div>
        </div>
    )
}