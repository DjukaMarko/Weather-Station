import { Feather } from "lucide-react";
import { motion } from "framer-motion"
import Hamburger from 'hamburger-react'
import MobileNavbarOptions from "./MobileNavbarOptions";
import { MTypes } from "@/lib/definitions";


export default function MobileNavbar({isClicked, setClicked, isSigningOut, handleSignOut} : MTypes) {


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
            <MobileNavbarOptions isClicked={isClicked} handleClick={handleClick} isSigningOut={isSigningOut} handleSignOut={handleSignOut} />
        </motion.div>
    )
}