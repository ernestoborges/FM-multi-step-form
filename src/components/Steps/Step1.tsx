import {Field} from "formik";

export function Step1() {
    return (
        <div className="form-step-content-wrapper personal-info">
            <label htmlFor="name">
                Name
                <Field id="name" name="name" placeholder="e.g. Stephen King" />
            </label>

            <label htmlFor="email">
                Email Address
                <Field id="email" name="email" placeholder="e.g. stephenking@lorem.com" />
            </label>

            <label htmlFor="phone">
                Phone Number
                <Field
                    id="phone"
                    name="phone"
                    placeholder="e.g. +1 234 567 890"
                />
            </label>
        </div>
    )
}