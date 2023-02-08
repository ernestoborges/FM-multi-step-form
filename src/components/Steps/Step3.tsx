import { Field, useFormikContext } from "formik";
import { Values } from "../MultiStepForm/MultiStepForm"

export function Step3() {

    const options = [
        { keyName: "online_service", name: "Online service", desc: "Acess to multiple games", price: 1 },
        { keyName: "larger_storage", name: "Larger storage", desc: "Extra 1TB of cloud save", price: 2 },
        { keyName: "cuztomizeble_profile", name: "Customizable Profile", desc: "Custom theme your profile", price: 2 }
    ]

    const { values } = useFormikContext<Values>();


    return (
        <div className="form-step-content-wrapper addons-step">
            <ul role="group">
                {
                    options.map((option, index) => (
                        <li key={index}>
                            <label className={`${values.addons[option.keyName as keyof typeof values.addons] ? "option-selected" : ""}`}>
                                <Field
                                    type="checkbox"
                                    name={`addons.${option.keyName}`}
                                />
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