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
    children?: React.ReactNode;
}

const InputField = ({
    className,
    type,
    label,
    value,
    name,
    placeholder,
    error,
    onChange,
    children,
}: InputFieldProps) => {
    return (
        <div className="mb-[27px]">
            <div className={`${children ? "flex items-end gap-5" : ""}`}>
                <label className="font-medium flex-column text-[18px]  text-black-chocolate text-left">
                    {label}
                    <input
                        className={`${className} font-normal leading-relaxed  mt-2 p-[18px] focus:outline-0 text-[18px] rounded-[13.5px] bg-albescent-white text-brown-coffee placeholder:text-brown-coffee`}
                        type={type}
                        value={value}
                        name={name}
                        placeholder={placeholder}
                        onChange={onChange}
                    />
                </label>
                {children}
            </div>
            {error && <p>Input filed can&apos;t be empty!</p>}
        </div>
    );
};

export default InputField;
