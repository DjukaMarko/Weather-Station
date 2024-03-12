"use client"
import { Metadata } from "next";
import Sidebar from "@/components/ui/Sidebar";
import useWindowDimensions from "@/components/hooks/useWindowDimensions";
import MobileNavbar from "@/components/ui/MobileNavbar";
import { useEffect, useState } from "react";
import MobileNavbarOptions from "@/components/ui/MobileNavbarOptions";
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

    const [isHovered, setIsHovered] = useState(false);
    const [isSigningOut, setSigningOut] = useState(false);

    const handleSignOut = () => {
        setSigningOut(true);
        //misauthenticate();
    }

    const handleHover = () => {
        setIsHovered(!isHovered);
    };
    return (
        <div className="fixed w-full h-full flex flex-col sm:flex-row box-border">
            <div className="hidden sm:block">
                <Sidebar isHovered={isHovered} isSigningOut={isSigningOut} handleSignOut={handleSignOut} handleHover={handleHover}/>
            </div>
            <div className="block sm:hidden">
                <MobileNavbar isHovered={isHovered} isSigningOut={isSigningOut} handleSignOut={handleSignOut} handleHover={handleHover} isClicked={isNavbarClicked} setClicked={setNavbarClicked} />
            </div>
            {children}
        </div>
    )
}