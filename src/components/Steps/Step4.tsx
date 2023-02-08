import { useFormikContext } from "formik";
import { Values } from "../MultiStepForm/MultiStepForm";

export function Step4() {

    const plans = [
        { name: "Arcade", month: 9, year: 90 },
        { name: "Advanced", month: 12, year: 120 },
        { name: "Pro", month: 15, year: 150 }
    ]

    const options = [
        { keyName: "online_service", name: "Online service", desc: "Acess to multiple games", price: { year: 10, month: 1 } },
        { keyName: "larger_storage", name: "Larger storage", desc: "Extra 1TB of cloud save", price: { year: 20, month: 2 } },
        { keyName: "cuztomizeble_profile", name: "Customizable Profile", desc: "Custom theme your profile", price: { year: 20, month: 2 } }
    ]

    const { setFieldValue, values } = useFormikContext<Values>();

    return (
        <div className="form-step-content-wrapper final-step">
            <div className="card">
                <div className="plan-info">
                    <div>
                        <p>{`${values.plan} (${values.yearly_payment ? "Yearly" : "Monthly"})`}</p>
                        <button type="button" onClick={() => setFieldValue("yearly_payment", !values.yearly_payment)}
                        >Change</button>
                    </div>
                    <output>
                        {`$
                            ${values.yearly_payment
                                ? plans.find(plan => plan.name === values.plan)?.year + "/yr"
                                : plans.find(plan => plan.name === values.plan)?.month + "/mo"
                            }
                        `}
                    </output>
                </div>
                <hr />
                <ul className="options-list">
                    {
                        options.map((option, index) => (
                            <li key={index} className={`${values.addons[option.keyName as keyof typeof values.addons] ? "" : "hidden"}`}>
                                <p>{option.name}</p>
                                <p>{`$${values.yearly_payment
                                    ? option.price.year + "/yr"
                                    : option.price.month + "/mo"
                                    }`}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="total">
                <p>{`Total (${values.yearly_payment ? "per year" : "per month"})`}</p>
                <p>
                    {values.yearly_payment
                            ?   `+$${plans.filter(plan => plan.name === values.plan )[0].year 
                                + 
                                options.reduce((a, b) => {
                                    if(values.addons[b.keyName as keyof typeof values.addons]){
                                        return a + b.price.year
                                    }
                                    return a + 0
                                }, 0)}/yr`
                            :   `+$${plans.filter(plan => plan.name === values.plan)[0].month
                                + 
                                options.reduce((a, b) => {
                                    if(values.addons[b.keyName as keyof typeof values.addons]){
                                        return a + b.price.month
                                    }
                                    return a + 0
                                }, 0)}/mo`
                    }
                </p>
            </div>
        </div>
    )
}