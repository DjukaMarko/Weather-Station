import { ArrowRightFromLine, Feather, LayoutGrid, LogOut, Menu, Settings, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";
import { misauthenticate } from "@/lib/actions";
import Link from "next/link";
import Hamburger from 'hamburger-react'



export default function MobileNavbarOptions({ isClicked, setClicked }: { isClicked: boolean, setClicked: React.Dispatch<React.SetStateAction<boolean>> }) {


    const handleClick = () => {
        setClicked(!isClicked);
    };
    return (
        <AnimatePresence>
            {isClicked &&
                <motion.div
                    key="uniqueKey"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition= {{ duration: 0.2 }}
                    onClick={handleClick}
                    className="relative w-full h-full bg-zinc-800 flex justify-center items-center">
                </motion.div>
            }
        </AnimatePresence>
    )
}