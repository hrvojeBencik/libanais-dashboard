import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Banner from "./_components/elements/Banner/Banner";
import SidebarHandler from "./_components/modules/Sidebar/SidebarHandler";

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
            <body
                className={`${poppins.className} flex min-h-screen overflow-hidden`}
            >
                <SidebarHandler>
                    <div className="w-full bg-white-smoke ">
                        <Banner />
                        <div className="flex flex-col ">{children}</div>
                    </div>
                </SidebarHandler>
            </body>
        </html>
    );
}
