import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "2026 New Year Countdown",
    description: "Counting down to 2026 in Bangkok (UTC+7) with a premium experience.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
