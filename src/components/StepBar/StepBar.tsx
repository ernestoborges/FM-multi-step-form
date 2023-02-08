import "./styles.css"
import {useContext} from "react";
import StepContext from "../../context/StepProvider";

interface Props {
    steps: {
        n: number;
        title: string;
        subtitle: string;
        text: string;
    }[]
    ;
}

export function StepBar({ steps }: Props) {

    const currentStep = useContext(StepContext)?.selectedStep;

    return (
        <section className="step-track">
            <ul>
                {
                    steps.map((step) =>
                        <li>
                            <div
                                className={`${currentStep === step.n ? "selected-step" : ""}`}
                            >{step.n}</div>
                            <div>
                                <p>{`step ${step.n}`}</p>
                                <p>{step.title}</p>
                            </div>
                        </li>
                    )
                }
            </ul>
        </section>
    )
}