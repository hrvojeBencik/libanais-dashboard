import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "brown-derby": "#5c4338",
                "albescent-white": "#dfdac9",
                "white-smoke": "f9f9f9",
                "grey-eclipse": "#3c3c3c",
            },
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
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
