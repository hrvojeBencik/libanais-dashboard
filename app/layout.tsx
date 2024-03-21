import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/modules/Sidebar/Sidebar";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["500"],
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
            <body className={`${poppins.className} flex`}>
                <Sidebar />
                {children}
            </body>
        </html>
    );
}
