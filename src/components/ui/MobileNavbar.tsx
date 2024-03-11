import { ArrowRightFromLine, Feather, LayoutGrid, LogOut, Menu, Settings, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";
import { misauthenticate } from "@/lib/actions";
import Link from "next/link";
import Hamburger from 'hamburger-react'



export default function MobileNavbar({isClicked, setClicked} : {isClicked:boolean, setClicked:React.Dispatch<React.SetStateAction<boolean>>}) {


    const handleClick = () => {
        setClicked(!isClicked);
    };
    return (
        <motion.div
            initial={{ height: "6rem" }}
            animate={{ height: "5rem" }}
            onClick={handleClick}
            className="w-full bg-zinc-800 flex justify-between items-center p-6">
            <Feather color="#d1d1d1" size={28} />
            <Hamburger direction="right" size={28} color="#d1d1d1" toggled={isClicked} toggle={setClicked} />
        </motion.div>
    )
}