import { Field } from "formik";


interface Props {
    selectedPlan: string;
    yearly_payment: boolean;
    addons: {
        online_service: boolean;
        larger_storage: boolean;
        cuztomizeble_profile: boolean;
    };
    setFormValues: Function;
}

export function Step4({ selectedPlan, yearly_payment, addons, setFormValues }: Props) {

    const plans = [
        { name: "Arcade", month: 9, year: 90 },
        { name: "Advanced", month: 12, year: 120 },
        { name: "Pro", month: 15, year: 150 }
    ]

    const optionsMap = new Map<number, { keyName: string; name: string; desc: string; price: { year: number; month: number }; }>([
        [1, { keyName: "online_service", name: "Online service", desc: "Acess to multiple games", price: { year: 10, month: 1 } }],
        [2, { keyName: "larger_storage", name: "Larger storage", desc: "Extra 1TB of cloud save", price: { year: 20, month: 2 } }],
        [3, { keyName: "cuztomizeble_profile", name: "Customizable Profile", desc: "Custom theme your profile", price: { year: 20, month: 2 } }]
    ])

    return (
        <div className="form-step-content-wrapper final-step">
            <div className="card">
                <div className="plan-info">
                    <div>
                        <p>{`${selectedPlan} (${yearly_payment ? "Yearly" : "Monthly"})`}</p>
                        <button type="button" onClick={() =>
                            setFormValues(
                                (prev: { [key: string]: any, yearly_payment: boolean }) => (
                                    {
                                        ...prev,
                                        yearly_payment: !yearly_payment
                                    }
                                )
                            )
                        }
                        >Change</button>
                    </div>
                    <output>
                        {`$
                            ${yearly_payment
                                ? plans.find(plan => plan.name === selectedPlan)?.year + "/yr"
                                : plans.find(plan => plan.name === selectedPlan)?.month + "/mo"
                            }
                        `}
                    </output>
                </div>
                <hr />
                <ul className="options-list">
                    {
                        Array.from(optionsMap.values()).map((option) => (
                            <li className={`${addons[option.keyName as keyof typeof addons] ? "" : "hidden"}`}>
                                <p>{option.name}</p>
                                <p>{`$${yearly_payment
                                    ? option.price.year + "/yr"
                                    : option.price.month + "/mo"
                                    }`}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="total">
                <p>{`Total (${yearly_payment ? "per year" : "per month"})`}</p>
                <p>
                    {
                        yearly_payment
                            ?   plans.filter(plan => plan.name === selectedPlan )[0].year 
                                + 
                                Array.from(optionsMap.values()).reduce((a, b) => {
                                    if(addons[b.keyName as keyof typeof addons]){
                                        return a + b.price.year
                                    }
                                    return a + 0
                                }, 0)
                            :   plans.filter(plan => plan.name === selectedPlan)[0].month
                                + 
                                Array.from(optionsMap.values()).reduce((a, b) => {
                                    if(addons[b.keyName as keyof typeof addons]){
                                        return a + b.price.month
                                    }
                                    return a + 0
                                }, 0)
                    }
                </p>
            </div>
        </div>
    )
}