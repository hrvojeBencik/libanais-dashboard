import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/modules/Sidebar/Sidebar";
import Header from "./_components/modules/Header/Header";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.className} flex w-full`}>
                <Sidebar />
                <div className="block flex-grow p-11 bg-white-smoke">
                    <Header className="mb-11" />
                    {children}
                </div>
            </body>
        </html>
    );
}
