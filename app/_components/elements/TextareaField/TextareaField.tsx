import { ChangeEvent } from "react";

interface TextareaFieldProps {
    label: string;
    rows: number;
    value: string | number;
    name: string;
    placeholder: string;
    error?: boolean;
    required?: boolean;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField = ({
    label,
    rows,
    value,
    name,
    placeholder,
    error,
    required,
    onChange,
}: TextareaFieldProps) => {
    return (
        <>
            <label className="font-medium mb-2 text-[18px] text-black-chocolate text-left">
                {label}
            </label>
            <textarea
                className="p-[18px] min-h-[119px] font-normal resize-none focus:outline-0 text-[18px] rounded-[13.5px] bg-albescent-white text-brown-coffee placeholder:text-brown-coffee"
                value={value}
                rows={rows}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
            />
            {error && <p>Input filed can't be empty!</p>}
        </>
    );
};

export default TextareaField;
