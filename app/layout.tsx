import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "./globals.css";

import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const siteName = "[Project Name Here]";
const description = "[Project description here]";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.BETTER_AUTH_URL || "http://localhost:3000"),
    title: {
        default: siteName,
        template: `%s | ${siteName}`,
    },
    description,
    openGraph: {
        title: siteName,
        description,
        siteName,
        type: "website",
        url: "/",
    },
    twitter: {
        card: "summary_large_image",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-screen flex flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NavBar />
                    <Breadcrumbs />
                    <main className="flex flex-col flex-1">{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}