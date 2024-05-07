"use client";

interface BoxProps {
    className?: string;
}

export default ({ className }: BoxProps) => (
    <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.97 5.44619L10.72 0.932129C10.2719 0.684548 9.72807 0.684548 9.28 0.932129L1.03 5.44807C0.550138 5.71062 0.251242 6.21357 0.25 6.76057V15.7268C0.251242 16.2738 0.550138 16.7768 1.03 17.0393L9.28 21.5553C9.72807 21.8028 10.2719 21.8028 10.72 21.5553L18.97 17.0393C19.4499 16.7768 19.7488 16.2738 19.75 15.7268V6.7615C19.7498 6.2135 19.4507 5.70923 18.97 5.44619V5.44619ZM10 2.24463L17.5319 6.36963L14.7409 7.89775L7.20813 3.77275L10 2.24463ZM10 10.4946L2.46812 6.36963L5.64625 4.62963L13.1781 8.75463L10 10.4946ZM1.75 7.68213L9.25 11.7865V19.8293L1.75 15.7278V7.68213ZM18.25 15.724V15.724L10.75 19.8293V11.7903L13.75 10.1487V13.4946C13.75 13.9088 14.0858 14.2446 14.5 14.2446C14.9142 14.2446 15.25 13.9088 15.25 13.4946V9.32744L18.25 7.68213V15.7231V15.724Z"
            fill="#464255"
        />
    </svg>
);
