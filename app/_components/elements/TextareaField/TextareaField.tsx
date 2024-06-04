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
            <label className="font-medium mb-2 text-[18px] sm:text-sm text-black-chocolate text-left">
                {label}
            </label>
            <textarea
                className="p-[18px] min-h-[119px] font-normal resize-none focus:outline-0 text-[18px] sm:text-sm rounded-[13.5px] sm:rounded-lg bg-albescent-white text-brown-coffee placeholder:text-brown-coffee"
                value={value}
                rows={rows}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
            />
            {error && (
                <p className="sm:text-sm">Input filed can&apos;t be empty!</p>
            )}
        </>
    );
};

export default TextareaField;
