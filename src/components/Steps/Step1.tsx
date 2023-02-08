import { ErrorMessage, Field, useFormikContext } from "formik";
import { PhoneMask } from "../Masks/PhoneMask";

export function Step1() {

    const { errors, touched } = useFormikContext<any>();

    return (
        <div className="form-step-content-wrapper personal-info">
            <label htmlFor="name">
                <div>
                    <span>Name</span>
                    <ErrorMessage name="name" component="span" />
                </div>
                <Field id="name" name="name" placeholder="e.g. Stephen King" className={touched.name && errors.name ? "invalid-input" : ""} />
            </label>

            <label htmlFor="email">
                <div>
                    <span>Email Address</span>
                    <ErrorMessage name="email" component="span" />
                </div>
                <Field id="email" name="email" placeholder="e.g. stephenking@lorem.com" className={touched.email && errors.email ? "invalid-input" : ""} />
            </label>

            <label htmlFor="phone">
                <div>
                    <span>Phone Number</span>
                    <ErrorMessage name="phone" component="span" />
                </div>
                <PhoneMask id="phone" name="phone" placeholder="e.g. (00) 0000-0000" className={touched.email && errors.email ? "invalid-input" : ""} />
            </label>
        </div>
    )
}