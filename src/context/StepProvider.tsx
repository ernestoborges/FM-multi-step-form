import { createContext, useState } from "react";

interface StepContextValue {
    selectedStep: number;
    setSelectedStep: (value: number) => void;
}

interface StepProviderProps {
    children: React.ReactNode
}

const StepContext = createContext<StepContextValue | null>(null);

export function StepProvider({ children  }: StepProviderProps) {

    const [selectedStep, setSelectedStep] = useState<number>(1);
    const value: StepContextValue = { selectedStep, setSelectedStep }

    return (
        <StepContext.Provider value={value}>
            {children}
        </StepContext.Provider>
    );
}

export default StepContext;