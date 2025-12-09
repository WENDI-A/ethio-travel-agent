'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/AuthProvider";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <html lang="en">
            <body className={inter.className}>
                {/* Load Transformers.js library for AI chat */}
                <Script
                    id="transformers-js"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (async () => {
                                const { pipeline, env } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2');
                                window.transformers = { pipeline, env };
                            })();
                        `
                    }}
                />

                <AuthProvider>
                    {!isAdminRoute && <Navbar />}

                    <main className="min-h-screen">
                        {children}
                    </main>

                    {!isAdminRoute && <Footer />}
                </AuthProvider>
            </body>
        </html>
    );
}
