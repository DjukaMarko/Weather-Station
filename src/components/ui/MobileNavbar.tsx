import { ArrowRightFromLine, Feather, LayoutGrid, LogOut, Menu, Settings, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";
import { misauthenticate } from "@/lib/actions";
import Link from "next/link";
import Hamburger from 'hamburger-react'
import MobileNavbarOptions from "./MobileNavbarOptions";
import { MTypes, MobilePropTypes } from "@/lib/definitions";


export default function MobileNavbar({isClicked, setClicked, isHovered, isSigningOut, handleSignOut, handleHover} : MTypes) {


    const handleClick = () => {
        setClicked(!isClicked);
    };
    return (
        <motion.div
            initial={{ height: "6rem" }}
            animate={{ height: "5rem" }}
            className="w-full bg-zinc-800 flex justify-between items-center p-6">
            <Feather color="#d1d1d1" size={28} />
            <div onClick={handleClick}>
                <Hamburger direction="right" size={28} color="#d1d1d1" toggled={isClicked} toggle={setClicked} />
            </div>
            <MobileNavbarOptions isClicked={isClicked} setClicked={setClicked} isSigningOut={isSigningOut} handleSignOut={handleSignOut} />
        </motion.div>
    )
}