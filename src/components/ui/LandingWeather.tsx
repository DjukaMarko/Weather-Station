import { AnimatePresence, motion } from "framer-motion"
import { CalendarDays, CloudDrizzle, CloudHail, MapPin, Navigation, Search, X } from "lucide-react"
import { useState } from "react"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function LandingWeather({ isLoading, weatherData, isSearchClicked, width, setSearchClicked }: { isLoading: boolean, weatherData: { [index: string]: (string | number) }, isSearchClicked: boolean, width: number, setSearchClicked: React.Dispatch<React.SetStateAction<boolean>> }) {

    return (
        <div className="relative w-full h-full overflow-hidden row-span-2">
            <div className="relative w-full h-full bg-zinc-800 rounded-2xl flex flex-col justify-end cursor-default p-6">
                {isLoading ? <SkeletonLoader /> : <WeatherWithData weatherData={weatherData} isSearchClicked={isSearchClicked} setSearchClicked={setSearchClicked} width={width} />}
            </div>
        </div>
    )
}


function SkeletonLoader() {
    return (
        <SkeletonTheme borderRadius={8} baseColor="#3f3f46" highlightColor="#52525b">
            <Skeleton className="mb-3" width={100} height={48} />
            <Skeleton className="mb-3" width={100} height={64} />
            <Skeleton className="mb-3" height={32} />
            <div className="w-full border-t-[1px] border-t-zinc-700 pt-3">
                <Skeleton />
                <Skeleton />
            </div>
        </SkeletonTheme>
    )
}


function WeatherWithData({ weatherData, isSearchClicked, setSearchClicked, width }: { weatherData: { [index: string]: (string | number) }, isSearchClicked: boolean, setSearchClicked: React.Dispatch<React.SetStateAction<boolean>>, width: number }) {
    const [isLocatorSet, setLocator] = useState(false);
    const handleLocator = () => {
        setLocator(true);
    }

    return (
        <>
            <motion.div className="absolute right-0 top-6 group rounded-full cursor-pointer flex flex-row-reverse items-center pr-4 md:p-6">
                <motion.div whileTap={{ scale: 1.05 }} whileHover={{ scale: 1.2 }} className="p-2" onClick={() => setSearchClicked(prevVal => !prevVal)}>
                    {isSearchClicked ? <X color="#fff" size={22} /> : <Search color="#fff" size={22} />}
                </motion.div>

                <AnimatePresence>
                    {isSearchClicked && <motion.input placeholder="e.g. New York" initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: width > 640 ? "100%" : "60%" }}
                        exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }} className="bg-zinc-700 mr-2 p-2 px-4 placeholder:text-[#fff] rounded-full hover:bg-zinc-600 text-[#fff] text-sm outline border-0 outline-0" />}
                </AnimatePresence>

                <motion.div whileTap={{ scale: 1.05 }} whileHover={{ scale: 1.2 }} className="p-2">
                    <Navigation onClick={handleLocator} fill={isLocatorSet ? "#fff" : "#27272a"} color="#fff" size={22} />
                </motion.div>
            </motion.div>

            <div className="w-full flex flex-col space-y-3 pb-4">
                <CloudDrizzle size={width > 640 ? 80 : 48} color="#fff" />
                <div className="text-[#fff] flex">
                    <p className="text-5xl sm:text-6xl">28</p>
                    <p className="text-2xl sm:text-2xl">°C</p>
                </div>
                <div className="flex space-x-2 items-center">
                    <CloudHail color="#fff" size={30} />
                    <p className="text-[#fff] text-xs sm:text-lg">Rainy Storm Clouds</p>
                </div>
            </div>
            <div className="w-full flex flex-col space-y-2 pt-4 border-t-[1px] border-t-zinc-700">
                <div className="flex space-x-2 items-center">
                    <MapPin size={20} color="#fff" />
                    <p className="text-[#fff] text-xs sm:text-base">{weatherData["_normalized_city"]}, {weatherData["ISO_3166-1_alpha-2"]}</p>
                </div>
                <div className="flex space-x-2 items-center">
                    <CalendarDays color="#fff" size={20} />
                    <p className="text-[#fff] text-xs sm:text-base">24 July, 2022</p>
                    <p className="text-[#fff] text-xs sm:text-base font-bold">5:01 AM</p>
                </div>
            </div>
        </>
    )
}