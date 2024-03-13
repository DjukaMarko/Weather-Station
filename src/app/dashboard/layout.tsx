
import { Metadata } from "next";
import ClientLayout from "./clientlayout";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: "Dashboard - Cloudcast",
    description: "Home page for Cloudcast",
}


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClientLayout>
            {children}
        </ClientLayout>
    )
}