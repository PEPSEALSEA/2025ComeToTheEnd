import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "2025 Come To The End",
    description: "A premium Next.js application for the end of 2025",
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
