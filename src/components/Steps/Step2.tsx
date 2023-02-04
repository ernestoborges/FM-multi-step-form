import "./styles.css"

interface Props {
    selectedPlan: string;
    setFormValues: Function;
    yearly_payment: boolean;
}

export function Step2({ selectedPlan, setFormValues, yearly_payment }: Props) {

    const plansMap = new Map<number, { name: string; month: number; year: number; }>([
        [1, { name: "Arcade", month: 9, year: 90 }],
        [2, { name: "Advanced", month: 12, year: 120 }],
        [3, { name: "Pro", month: 15, year: 150 }]
    ])

    return (
        <div className="form-step-content-wrapper plan-selection">
            <ul className="plan-list">
                {
                    Array.from(plansMap.values()).map((plan) => (
                        <li
                            className={`${selectedPlan == plan.name ? "selected-plan" : ""}`}
                            onClick={() => setFormValues((prev: [key: string]) => ({ ...prev, plan: plan.name }))}
                        >
                            <div>
                                <img src={`src/assets/images/icon-${plan.name}.svg`} />
                            </div>
                            <div>
                                <p>{plan.name}</p>
                                <p>{`$${yearly_payment ? plan.year :plan.month}/${yearly_payment ? "yr" : "mo"}`}</p>
                                {yearly_payment && <p>2 months free</p>}
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div
                className="switcher-container"
            // onClick={() => setFormValues((prev: [key: string]) => ({ ...prev, yearly_payment: yearly_payment ? false : true }))}
            >
                <p 
                    className={`${!yearly_payment ? "selected-payment" : ""}`}
                    onClick={() => setFormValues((prev: [key: string]) => ({ ...prev, yearly_payment: false}))}
                >Monthly</p>
                <label className="switch">
                    <input
                        id="switch-input"
                        type="checkbox"
                        checked={yearly_payment}
                        readOnly
                        onClick={() => setFormValues((prev: [key: string]) => ({ ...prev, yearly_payment: yearly_payment ? false : true }))}
                    />
                    <span className="slider round"></span>
                </label>
                <p 
                    className={`${yearly_payment ? "selected-payment" : ""}`}
                    onClick={() => setFormValues((prev: [key: string]) => ({ ...prev, yearly_payment: true}))}
                >Yearly</p>

            </div>
        </div>
    )
}