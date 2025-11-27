import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIChat from "@/components/AIChat";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ethio Travel - Discover Ethiopia with AI",
    description: "Experience the beauty and culture of Ethiopia with AI-powered personalized travel recommendations",
    manifest: "/manifest.json",
    themeColor: "#10b981",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Ethio Travel",
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <Navbar />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                    <AIChat />
                </AuthProvider>
            </body>
        </html>
    );
}
