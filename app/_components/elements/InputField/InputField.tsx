import { ChangeEvent } from "react";

export enum InputType {
    Text = "text",
    Number = "number",
    Email = "email",
    Password = "password",
}

interface InputFieldProps {
    className?: string;
    type: InputType;
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
        <div className="mb-[27px] sm:mb-4">
            <div
                className={`${children ? "flex items-end gap-5 sm:gap-6" : ""}`}
            >
                <label
                    className={`font-medium flex-column text-[18px] sm:text-sm  text-black-chocolate text-left ${
                        children ? "sm:w-1/2" : ""
                    }`}
                >
                    {label}
                    <input
                        className={`${className} font-normal leading-relaxed  mt-2 p-[18px] 
                        sm:p-3 focus:outline-0 text-[18px] sm:text-sm rounded-[13.5px] sm:rounded-lg 
                        bg-albescent-white text-brown-coffee placeholder:text-brown-coffee`}
                        type={type}
                        value={value}
                        name={name}
                        placeholder={placeholder}
                        onChange={onChange}
                    />
                </label>
                {children}
            </div>
            {error && (
                <p className="sm:text-sm">Input filed can&apos;t be empty!</p>
            )}
        </div>
    );
};

export default InputField;
