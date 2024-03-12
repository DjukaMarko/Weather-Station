
import { Metadata } from "next";
import ClientLayout from "./clientlayout";


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
            { children }
        </ClientLayout>
    )
}