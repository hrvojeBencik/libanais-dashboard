interface MinusProps {
    className?: string;
    onClick?: () => void;
}

export default ({ className, onClick }: MinusProps) => (
    <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        className={className}
    >
        <rect
            y="0.634155"
            width="25.3659"
            height="25.3659"
            rx="9.51219"
            fill="#ECEAE1"
        />
        <rect
            x="10.1463"
            y="12.5923"
            width="5.07317"
            height="1.26829"
            rx="0.634146"
            fill="#5C4338"
        />
    </svg>
);
