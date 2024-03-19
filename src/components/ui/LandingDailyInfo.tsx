import { CloudDrizzle } from "lucide-react"
import Modal from "./Modal"
import { useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function LandingDailyInfo({ isLoading, width }: { isLoading: boolean, width: number }) {
    const [isShownModal, setShownModal] = useState(false);
    return (
        <div className="relative w-full h-full col-start-1 row-start-3 row-span-2">
            <Modal isShown={isShownModal} setShown={setShownModal}>
                <div className="w-full h-full divide-y divide-zinc-700">
                    {[1, 1, 1, 1, 1, 1, 1].map((el, index) => {
                        return (
                            <div key={index} className="flex w-full space-x-7 md:space-x-12 py-2 items-center text-white">
                                <CloudDrizzle size={width > 640 ? 50 : 35} color="#fff" />
                                <div className="flex items-end">
                                    <p className="text-xs sm:text-lg lg:text-2xl">29°/</p>
                                    <p className="text-xs sm:text-base lg:text-lg">18°</p>
                                </div>
                                <p className="text-xs sm:text-base lg:text-lg">25 july</p>
                                <p className="text-xs sm:text-base lg:text-lg">Tuesday</p>
                            </div>
                        )
                    })}
                </div>
            </Modal>
            <div className="w-full h-full bg-zinc-800 rounded-2xl cursor-pointer overflow-hidden relative">
                {isLoading ? <SkeletonLoader /> : <DailyInfoWithData isShownModal={isShownModal} setShownModal={setShownModal} width={width} />}
            </div>
        </div>
    )
}


function SkeletonLoader() {
    return (
        <>
            <div className="absolute z-[1] w-full h-full bg-gradient-to-b from-transparent to-black/70"></div>
            <div className="w-full h-full p-6 divide-y divide-zinc-700">
                <SkeletonTheme borderRadius={12} baseColor="#3f3f46" highlightColor="#52525b">
                    <div className="py-2">
                        <Skeleton height={58} />
                    </div>
                    <div className="py-2">
                        <Skeleton height={58} />
                    </div>
                    <div className="py-2">
                        <Skeleton height={58} />
                    </div>
                    <div className="py-2">
                        <Skeleton height={58} />
                    </div>
                    <div className="py-2">
                        <Skeleton height={58} />
                    </div>
                    <div className="py-2">
                        <Skeleton height={58} />
                    </div>
                </SkeletonTheme>
            </div>
        </>
    )
}
function DailyInfoWithData({ isShownModal, setShownModal, width }: { isShownModal: boolean, setShownModal: React.Dispatch<React.SetStateAction<boolean>>, width: number }) {
    return (
        <div onClick={() => setShownModal(true)}>
            <div className="absolute z-[1] w-full h-full bg-gradient-to-b from-transparent to-black/70"></div>
            <div>
                <div className="absolute w-[90%] h-20 md:h-24 rounded-xl bottom-4 left-0 right-0 m-auto bg-zinc-800 z-[2] flex items-center space-x-4 p-4">
                    <CloudDrizzle color="#fff" size={width > 640 ? 48 : 40} />
                    <div className="flex flex-col">
                        <p className="text-white text-xs md:text-sm">Tomorrow</p>
                        <p className="text-white text-md md:text-2xl">23°</p>
                        <p className="text-white text-xs md:text-xs">Thunder Storm day</p>
                    </div>
                </div>
                <div className="flex flex-col p-6 md:px-10 md:py-7 divide-y divide-zinc-700">
                    {[1, 1, 1, 1, 1, 1].map((el, index) => {
                        return (
                            <div key={index} className="py-2 flex w-full justify-between items-center text-white">
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
    )
}