import React, { useState } from "react";
import { Field, useFormikContext } from "formik";
import { ClassNames } from "@emotion/react";

interface Props {
    name: string;
    id: string;
    placeholder: string;
    className: string;
}


export function PhoneMask({ name, id, placeholder,className}: Props) {

    const { setFieldValue } = useFormikContext();
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let val = event.target.value.replace(/\D/g, "");
        val = val.slice(0, 10);
        setValue(
            `(${val.slice(0, 2)}) ${val.slice(2, 6)}-${val.slice(6, 10)}`
        );
        setFieldValue(name, val);
    };

    return (
        <Field
            name={name}
            render={({ field }: any) => (
                <input
                    {...field}
                    className={className}
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            )}
        />
    );
};