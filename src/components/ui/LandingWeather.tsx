import { AnimatePresence, motion } from "framer-motion"
import { CalendarDays, MapPin, Navigation, Search, X } from "lucide-react"
import Image from "next/image";
import { useState } from "react"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function LandingWeather({ convertKelvinToCel, capitalizeWords, handleLocationClick, isLoading, weatherData, isSearchClicked, width, setSearchClicked }: { capitalizeWords: (input:string) => string, convertKelvinToCel: (kelvin:number) => number, handleLocationClick: () => void, isLoading: boolean, weatherData: { [index: string]: (string | number) }, isSearchClicked: boolean, width: number, setSearchClicked: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [isLocatorSet, setLocator] = useState(false); // This is a state that is used to determine if the locator button is clicked or not
    return (
        <div className="relative w-full h-full overflow-hidden row-span-2">
            <div className="relative w-full h-full bg-zinc-800 rounded-2xl flex flex-col justify-end cursor-default p-6">
                {(isLoading || Object.keys(weatherData).length <= 0) ? <SkeletonLoader /> : <WeatherWithData capitalizeWords={capitalizeWords} convertKelvinToCel={convertKelvinToCel} isLocatorSet={isLocatorSet} setLocator={setLocator} handleLocationClick={handleLocationClick} weatherData={weatherData} isSearchClicked={isSearchClicked} setSearchClicked={setSearchClicked} width={width} />}
            </div>
        </div>
    )
}

function convertTimestampToDate(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB");
}

function convertTimestampToTimeAMPM(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    const timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' + ampm;

    return timeString;
}


function SkeletonLoader() {
    return (
        <div className="relative w-full h-full flex flex-col justify-end">
            <div className="absolute right-4 top-4 w-[130px] sm:w-[200px] h-[35px]">
                <Skeleton baseColor="#3f3f46" highlightColor="#52525b" className="w-full h-full" />
            </div>
            <Skeleton baseColor="#3f3f46" highlightColor="#52525b" className="mb-3" width={100} height={48} />
            <Skeleton baseColor="#3f3f46" highlightColor="#52525b" className="mb-3" width={100} height={64} />
            <Skeleton baseColor="#3f3f46" highlightColor="#52525b" className="mb-3" height={32} />
            <div className="w-full border-t-[1px] border-t-zinc-700 pt-3">
                <Skeleton baseColor="#3f3f46" highlightColor="#52525b" />
                <Skeleton baseColor="#3f3f46" highlightColor="#52525b" />
            </div>
        </div>
    )
}


function WeatherWithData({ capitalizeWords, convertKelvinToCel, isLocatorSet, setLocator, handleLocationClick, weatherData, isSearchClicked, setSearchClicked, width }: { capitalizeWords: (input:string) => string, convertKelvinToCel: (kelvin:number) => number, handleLocationClick: () => void, weatherData: any, isSearchClicked: boolean, setSearchClicked: React.Dispatch<React.SetStateAction<boolean>>, width: number, isLocatorSet: boolean, setLocator: React.Dispatch<React.SetStateAction<boolean>>}) {
    if(weatherData["data"] === undefined) return null;
    
    const handleLocator = () => {
        setLocator(true);
        handleLocationClick();      
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
                <Image className="relative right-3" src={`/animated/${weatherData["data"]["current"]["weather"][0]["icon"]}.svg`} width={width > 640 ? 80 : 60} height={width > 640 ? 80 : 60} alt="open2" />
                <div className="text-[#fff] flex">
                    <p className="text-5xl sm:text-6xl">{Math.round(convertKelvinToCel(weatherData["data"]["current"]["temp"]))}</p>
                    <p className="text-2xl sm:text-2xl">°C</p>
                </div>
                <div className="flex space-x-2 items-center">
                    <Image src={`/animated/${weatherData["data"]["current"]["weather"][0]["icon"]}.svg`} width={width > 640 ? 50 : 35} height={width > 640 ? 50: 35} alt="open1" />
                    <p className="text-[#fff] text-xs sm:text-lg">{capitalizeWords(weatherData["data"]["current"]["weather"][0]["description"])}</p>
                </div>
            </div>
            <div className="w-full flex flex-col space-y-2 pt-4 border-t-[1px] border-t-zinc-700">
                <div className="flex space-x-2 items-center">
                    <MapPin size={20} color="#fff" />
                    <p className="text-[#fff] text-xs sm:text-base">{weatherData["_normalized_city"]}, {weatherData["ISO_3166-1_alpha-2"]}</p>
                </div>
                <div className="flex space-x-2 items-center">
                    <CalendarDays color="#fff" size={20} />
                    <p className="text-[#fff] text-xs sm:text-base">{convertTimestampToDate(weatherData["data"]["current"]["dt"])}</p>
                    <p className="text-[#fff] text-xs sm:text-base font-bold">{convertTimestampToTimeAMPM(weatherData["data"]["current"]["dt"])}</p>
                </div>
            </div>
        </>
    )
}