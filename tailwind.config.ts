import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                sm: "576px",
                md: "960px",
                lg: "1440px",
            },
            colors: {
                "brown-derby": "#5c4338",
                "albescent-white": "#dfdac9",
                "white-smoke": "#f9f9f9",
                "grey-eclipse": "#3c3c3c",
                "light-grey": "#8a8a8a",
                "dark-gunmetal": "#181f2b",
                "raisin-black": "#2e211c",
                "cadet-blue": "#b2b9c4",
            },
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
            },
            fontWeight: {
                regular: "400",
                medium: "500",
                semibold: "600",
                bold: "700",
            },
            maxWidth: {
                "150": "150px",
            },
            margin: {
                "18": "18px",
            },
        },
    },
    plugins: [],
};
export default config;
