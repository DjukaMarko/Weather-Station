import { CloudDrizzle } from "lucide-react"
import Modal from "./Modal"
import { useState } from "react"

export default function LandingDailyInfo({ width }: { width: number }) {
    const [isShownModal, setShownModal] = useState(false);
    return (
        <div className="relative w-full h-full col-start-1 row-start-3 row-span-2">
            <Modal isShown={isShownModal} setShown={setShownModal}>
                {[1, 1, 1, 1, 1, 1, 1].map((el, index) => {
                    return (
                        <div key={index} className="flex w-full space-x-7 md:space-x-12 my-2 md:my-3 items-center text-white">
                            <CloudDrizzle size={width > 640 ? 50 : 40} color="#fff" />
                            <div className="flex items-end">
                                <p className="text-sm sm:text-lg lg:text-2xl">29°/</p>
                                <p className="text-xs sm:text-base lg:text-lg">18°</p>
                            </div>
                            <p className="text-sm sm:text-base lg:text-lg">25 july</p>
                            <p className="text-sm sm:text-base lg:text-lg">Tuesday</p>
                        </div>
                    )
                })}
            </Modal>
            <div onClick={() => setShownModal(true)} className="relative w-full h-full">
                <div className="w-full h-full bg-zinc-800 rounded-2xl cursor-pointer overflow-hidden relative">
                    <div className="absolute z-[1] w-full h-full bg-gradient-to-b from-transparent to-black/70"></div>
                    <div className="absolute w-[90%] h-20 md:h-24 rounded-xl bottom-4 left-0 right-0 m-auto bg-zinc-800 z-[2] flex items-center space-x-4 p-4">
                        <CloudDrizzle color="#fff" size={width > 640 ? 48 : 40} />
                        <div className="flex flex-col">
                            <p className="text-white text-xs md:text-sm">Tomorrow</p>
                            <p className="text-white text-md md:text-2xl">23°</p>
                            <p className="text-white text-xs md:text-xs">Thunder Storm day</p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 p-6 md:px-10 md:py-7">
                        {[1, 1, 1, 1, 1, 1].map((el, index) => {
                            return (
                                <div key={index} className="flex w-full justify-between items-center text-white">
                                    <CloudDrizzle size={width > 640 ? 50 : 40} color="#fff" />
                                    <div className="flex items-end">
                                        <p className="text-sm sm:text-lg lg:text-2xl">29°/</p>
                                        <p className="text-xs sm:text-base lg:text-lg">18°</p>
                                    </div>
                                    <p className="text-sm sm:text-base lg:text-lg">25 july</p>
                                    <p className="text-sm sm:text-base lg:text-lg">Tuesday</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}