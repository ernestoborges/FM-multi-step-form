import { Field } from "formik";
import { Values } from "../MultiStepForm/MultiStepForm";

interface Props {
    formValues: Values;
    setFormValues: Function;
}

export function Step4({ formValues, setFormValues }: Props) {

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

    return (
        <div className="form-step-content-wrapper final-step">
            <div className="card">
                <div className="plan-info">
                    <div>
                        <p>{`${formValues.plan} (${formValues.yearly_payment ? "Yearly" : "Monthly"})`}</p>
                        <button type="button" onClick={() =>
                            setFormValues(
                                (prev: { [key: string]: any, yearly_payment: boolean }) => (
                                    {
                                        ...prev,
                                        yearly_payment: !formValues.yearly_payment
                                    }
                                )
                            )
                        }
                        >Change</button>
                    </div>
                    <output>
                        {`$
                            ${formValues.yearly_payment
                                ? plans.find(plan => plan.name === formValues.plan)?.year + "/yr"
                                : plans.find(plan => plan.name === formValues.plan)?.month + "/mo"
                            }
                        `}
                    </output>
                </div>
                <hr />
                <ul className="options-list">
                    {
                        options.map((option) => (
                            <li className={`${formValues.addons[option.keyName as keyof typeof formValues.addons] ? "" : "hidden"}`}>
                                <p>{option.name}</p>
                                <p>{`$${formValues.yearly_payment
                                    ? option.price.year + "/yr"
                                    : option.price.month + "/mo"
                                    }`}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="total">
                <p>{`Total (${formValues.yearly_payment ? "per year" : "per month"})`}</p>
                <p>
                    {formValues.yearly_payment
                            ?   `+$${plans.filter(plan => plan.name === formValues.plan )[0].year 
                                + 
                                options.reduce((a, b) => {
                                    if(formValues.addons[b.keyName as keyof typeof formValues.addons]){
                                        return a + b.price.year
                                    }
                                    return a + 0
                                }, 0)}/yr`
                            :   `+$${plans.filter(plan => plan.name === formValues.plan)[0].month
                                + 
                                options.reduce((a, b) => {
                                    if(formValues.addons[b.keyName as keyof typeof formValues.addons]){
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