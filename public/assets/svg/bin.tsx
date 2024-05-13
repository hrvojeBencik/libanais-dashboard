"use client";

interface BinProps {
    onClick?: React.MouseEventHandler<SVGElement>;
}

export default ({ onClick }: BinProps) => (
    <svg
        onClick={onClick}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: "pointer" }}
    >
        <path
            d="M12 3.2H16V4.8H14.4V15.2C14.4 15.6418 14.0418 16 13.6 16H2.4C1.95818 16 1.6 15.6418 1.6 15.2V4.8H0V3.2H4V0.8C4 0.358176 4.35818 0 4.8 0H11.2C11.6418 0 12 0.358176 12 0.8V3.2ZM5.6 7.2V12H7.2V7.2H5.6ZM8.8 7.2V12H10.4V7.2H8.8ZM5.6 1.6V3.2H10.4V1.6H5.6Z"
            fill="#482428"
        />
    </svg>
);
