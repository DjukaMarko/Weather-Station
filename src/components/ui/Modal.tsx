import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
export default function Modal({ children, isShown, setShown }: { children: React.ReactNode, isShown: boolean, setShown: React.Dispatch<React.SetStateAction<boolean>> | null }) {
    const handleShown = () => {
        if (!setShown) return;
        setShown(prev => !prev);
    }

    if (typeof window === 'object') {
        return ReactDOM.createPortal(
            <AnimatePresence initial={false}>
                {isShown && (
                    <div className="fixed inset-0 w-full h-full z-[5] flex justify-center items-center">
                        <motion.div
                            onClick={handleShown}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            exit={{ opacity: 0 }}
                            className="absolute w-full h-full bg-black/50">
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.2 }}
                            className="max-h-96 m-6 bg-zinc-800 px-10 py-4 md:px-16 md:py-8 rounded-xl z-[6] overflow-y-scroll cursor-default">
                            {children}
                        </motion.div>
                    </div>
                )
                }
            </AnimatePresence>,
            document.getElementById("mymodal") as Element
        )
    }

    return null;
}