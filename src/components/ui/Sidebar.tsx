import { ArrowRightFromLine, Feather, LayoutGrid, LogOut, Settings } from "lucide-react";
import { motion } from "framer-motion"
import { useState } from "react";
import { misauthenticate } from "@/lib/actions";
import Link from "next/link";
import { Icons } from "./icons";
import { MobilePropTypes } from "@/lib/definitions";



export default function Sidebar({isHovered, isSigningOut, handleSignOut, handleHover}: MobilePropTypes) {
    return (
        <motion.div
            initial={{ width: "8rem" }}
            animate={{ width: isHovered ? "15rem" : "6rem" }}
            transition={{ duration: 0.3 }}
            className={` relative top-0 bottom-0 h-screen flex flex-col bg-zinc-800 z-[1]`}>
            <div onClick={handleHover} className="absolute cursor-pointer w-full h-full z-[-1]">
                <div className={`${isHovered && "rotate-180"} w-10 h-10 bg-zinc-900 hover:bg-zinc-600 p-1 rounded-lg bg-zinc-800 flex justify-center items-center absolute top-0 bottom-0 my-auto right-2 cursor-pointer`}>
                    <ArrowRightFromLine size={18} color="#d1d1d1" />
                </div>
            </div>
            <motion.div layout transition={{ duration: 0.3 }} className={`border-b-[1px] p-4 border-zinc-700`}>
                <Link href="/dashboard" className={`flex ${isHovered ? "space-x-2" : "space-y-1 flex-col"} items-center justify-center `}>
                    <Feather color="#d1d1d1" size={isHovered ? 30 : 28} />
                    {isHovered && <p className="text-[#d1d1d1] font-[600] text-xl cursor-default">Cloudcast</p>}
                </Link>
            </motion.div>
            <div className="">
                <div className={`cursor-pointer p-2 px-4 bg-gradient-to-r from-[#d1d1d1]/10 hover:bg-zinc-700 flex items-center ${!isHovered && "justify-center"}`}>
                    <LayoutGrid color="#d1d1d1" />
                    {isHovered && <p className="text-[#d1d1d1] text-md font-[600] ml-4">Home</p>}
                </div>
                <div className={`cursor-pointer p-2 px-4 hover:bg-zinc-700 flex items-center ${!isHovered && "justify-center"}`}>
                    <Settings color="#d1d1d1" />
                    {isHovered && <p className="text-[#d1d1d1] text-md font-[600] ml-4">Settings</p>}
                </div>
            </div>
            <motion.div onClick={handleSignOut} layout className={`absolute hover:bg-zinc-700 bottom-0 ${isHovered && "space-x-3"} cursor-pointer left-0 right-0 m-auto flex justify-center items-center border-t-zinc-700 border-t-[1px] p-3`}>
                {isSigningOut ? (
                    <Icons.spinner color="white" className="h-4 w-4 animate-spin" />
                ) : (
                    <>
                        <LogOut color="#d1d1d1" />
                        {isHovered && <p className="text-[#d1d1d1] font-[600] text-md">Sign Out</p>}
                    </>
                )}
            </motion.div>
        </motion.div>
    )
}