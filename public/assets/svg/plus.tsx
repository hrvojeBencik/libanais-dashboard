interface PlusProps {
    className?: string;
    onClick?: () => void;
}

export default ({ className, onClick }: PlusProps) => (
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
            x="0.512207"
            width="25.3659"
            height="25.3659"
            rx="9.51219"
            fill="#5C4338"
        />
        <rect
            x="13.8293"
            y="10.1464"
            width="5.07317"
            height="1.26829"
            rx="0.634146"
            transform="rotate(90 13.8293 10.1464)"
            fill="#ECEAE1"
        />
        <rect
            x="10.6585"
            y="11.9581"
            width="5.07317"
            height="1.26829"
            rx="0.634146"
            fill="#ECEAE1"
        />
    </svg>
);
