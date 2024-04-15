"use client"
import Sidebar from "@/components/ui/Sidebar";
import useWindowDimensions from "@/components/hooks/useWindowDimensions";
import MobileNavbar from "@/components/ui/MobileNavbar";
import { useEffect, useState } from "react";
import { misauthenticate } from "@/lib/actions";



export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { width } = useWindowDimensions();

    const [isNavbarClicked, setNavbarClicked] = useState(false);
    useEffect(() => {
        width > 640 && setNavbarClicked(false);
    }, [width]);

    const [isSigningOut, setSigningOut] = useState(false);

    const handleSignOut = () => {
        setSigningOut(true);
        misauthenticate();
    }

    return (
        <div className="bg-zinc-900 w-full h-screen min-h-[800px] flex flex-col sm:flex-row box-border overflow-y-scroll scrollbar-hide">
            <div className="hidden sm:block">
                <Sidebar isSigningOut={isSigningOut} handleSignOut={handleSignOut} />
            </div>
            <div className="block sm:hidden z-[1]">
                <MobileNavbar isSigningOut={isSigningOut} handleSignOut={handleSignOut} isClicked={isNavbarClicked} setClicked={setNavbarClicked} />
            </div>
            {children}
        </div>
    )
}