import { Field } from "formik";

interface Props {
    addons: {
        online_service: boolean;
        larger_storage: boolean;
        cuztomizeble_profile: boolean;
    };
    setFormValues: Function
}

export function Step3({ addons, setFormValues }: Props) {

    const optionsMap = new Map<number, { keyName: string; name: string; desc: string; price: number; }>([
        [1, { keyName: "online_service", name: "Online service", desc: "Acess to multiple games", price: 1 }],
        [2, { keyName: "larger_storage", name: "Larger storage", desc: "Extra 1TB of cloud save", price: 2 }],
        [3, { keyName: "cuztomizeble_profile", name: "Customizable Profile", desc: "Custom theme your profile", price: 2 }]
    ])

    return (
        <div className="form-step-content-wrapper addons-step">
            <ul>
                {
                    Array.from(optionsMap.values()).map((option, index) => (
                        <li >
                            <label className={`${addons[option.keyName as keyof typeof addons] ? "option-selected" : ""}`}>
                                <Field
                                    type="checkbox"
                                    name={`option${index + 1}`}
                                    checked={addons[option.keyName as keyof typeof addons]} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues((prev: { [key: string]: any, addons: object }) => ({
                                        ...prev,
                                        addons: {
                                            ...prev.addons,
                                            [option.keyName as keyof typeof addons]: e.target.checked
                                        }
                                    }))} />
                                <div>
                                    <p>{option.name}</p>
                                    <p>{option.desc}</p>
                                </div>
                                <p>{`+$${option.price}/mo`}</p>
                            </label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}