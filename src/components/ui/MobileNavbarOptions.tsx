import { AnimatePresence, motion } from "framer-motion"
import Hamburger from "hamburger-react";
import { Feather, LayoutGrid, LogOut, Settings } from "lucide-react";
import { Icons } from "./icons";
import { MOptionsTypes } from "@/lib/definitions";


export default function MobileNavbarOptions({ isClicked, handleClick, isSigningOut, handleSignOut }: MOptionsTypes) {
    return (
        <AnimatePresence>
            {isClicked &&
                <motion.div
                    key="uniqueKey"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 w-full h-full bg-zinc-800 flex justify-center items-center">
                    <div className="absolute bottom-5">
                        <Feather color="#fff" size={32} />
                    </div>
                    <div className="absolute top-5 right-5">
                        <Hamburger direction="right" size={28} color="#fff" toggled={isClicked} toggle={handleClick} />
                    </div>
                    <div className="flex flex-col space-y-4 relative">
                        <motion.div layout className="flex items-center space-x-4 cursor-pointer hover:bg-zinc-600 bg-gradient-to-r from-[#fff]/20 to-[#fff]/10 px-4 py-2 rounded-xl">
                            <LayoutGrid size={32} color="#fff" />
                            <p className="text-[#fff] text-lg font-[600] ml-4">Home</p>
                        </motion.div>

                        <motion.div layout className="flex items-center space-x-4 cursor-pointer hover:bg-zinc-700 px-4 py-2 rounded-xl">
                            <Settings size={32} color="#fff" />
                            <p className="text-[#fff] text-lg font-[600] ml-4">Settings</p>
                        </motion.div>
                        <form onSubmit={(e) => handleSignOut(e)}>
                            <motion.button layout className="w-full flex items-center space-x-4 cursor-pointer hover:bg-zinc-700 px-4 py-2 rounded-xl">
                                {isSigningOut ? (
                                    <Icons.spinner color="white" className="h-6 w-6 animate-spin m-auto" />
                                ) : (
                                    <>
                                        <LogOut size={32} color="#fff" />
                                        <p className="text-[#fff] font-[600] text-lg">Sign Out</p>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}