import { Field } from "formik";
import {Values} from "../MultiStepForm/MultiStepForm"

interface Props {
    formValues: Values;
    setFormValues: Function
}

export function Step3({ formValues, setFormValues }: Props) {

    const options = [
        { keyName: "online_service", name: "Online service", desc: "Acess to multiple games", price: 1 },
        { keyName: "larger_storage", name: "Larger storage", desc: "Extra 1TB of cloud save", price: 2 },
        { keyName: "cuztomizeble_profile", name: "Customizable Profile", desc: "Custom theme your profile", price: 2 }
    ]

    return (
        <div className="form-step-content-wrapper addons-step">
            <ul>
                {
                    options.map((option, index) => (
                        <li >
                            <label className={`${formValues.addons[option.keyName as keyof typeof formValues.addons] ? "option-selected" : ""}`}>
                                <Field
                                    type="checkbox"
                                    name={`option${index + 1}`}
                                    checked={formValues.addons[option.keyName as keyof typeof formValues.addons]} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues((prev: { [key: string]: any, addons: object }) => ({
                                        ...prev,
                                        addons: {
                                            ...prev.addons,
                                            [option.keyName as keyof typeof formValues.addons]: e.target.checked
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