import { ChangeEvent } from "react";

interface InputFieldProps {
    className?: string;
    type: "text" | "number" | "email" | "password";
    label: string;
    value: string | number;
    name: string;
    placeholder: string;
    error?: boolean;
    required?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
    className,
    type,
    label,
    value,
    name,
    placeholder,
    error,
    required,
    onChange,
}: InputFieldProps) => {
    return (
        <>
            <label className="font-medium flex-column text-[18px] text-black-chocolate text-left">
                {label}
                <input
                    className={`${className} font-normal leading-relaxed mb-[27px] mt-2 p-[18px] focus:outline-0 text-[18px] rounded-[13.5px] bg-albescent-white text-brown-coffee placeholder:text-brown-coffee`}
                    type={type}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    required={required}
                />
            </label>

            {error && <p>Input filed can't be empty!</p>}
        </>
    );
};

export default InputField;
