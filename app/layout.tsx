import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavigationHandler from "./_components/modules/NavigationHandler/NavigationHandler";
import Loading from "./_components/elements/Loading/Loading";
import { DataProvider } from "./_contexts/DataContext";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Libanais Dashboard",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${poppins.className}  min-h-screen bg-white-smoke w-screen`}
            >
                <DataProvider>
                    <Loading>
                        <NavigationHandler>{children}</NavigationHandler>
                    </Loading>
                </DataProvider>
            </body>
        </html>
    );
}
