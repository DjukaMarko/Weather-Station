import { querySearchAutoCompletion } from "@/lib/actions";
import { QueryResultRow } from "@vercel/postgres";
import { AnimatePresence, motion } from "framer-motion"
import { CalendarDays, MapPin, Navigation, Search, X } from "lucide-react"
import Image from "next/image";
import { useEffect, useState } from "react"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Modal from "./Modal";

interface typeLandingWeatherWithData {
    setSelectedCity: React.Dispatch<React.SetStateAction<{ name: string, cou_name_en: string, lat: number, lon: number }>>,
    searchAutoCompletion: QueryResultRow[],
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    capitalizeWords: (input: string) => string,
    convertKelvinToCel: (kelvin: number) => number,
    handleLocationClick: () => void,
    weatherData: any,
    isSearchClicked: boolean,
    setSearchClicked: React.Dispatch<React.SetStateAction<boolean>>,
    width: number,
    isLocatorSet: boolean,
    setLocator: React.Dispatch<React.SetStateAction<boolean>>,
    setMobileSearchBarClicked: React.Dispatch<React.SetStateAction<boolean>>
}

interface typeLandingWeather {
    setSelectedCity: React.Dispatch<React.SetStateAction<{ name: string, cou_name_en: string, lat: number, lon: number }>>,
    capitalizeWords: (input: string) => string,
    convertKelvinToCel: (kelvin: number) => number,
    handleLocationClick: () => void,
    isLoading: boolean,
    weatherData: any,
    isSearchClicked: boolean,
    width: number,
    setSearchClicked: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LandingWeather({
    setSelectedCity,
    convertKelvinToCel,
    capitalizeWords,
    handleLocationClick,
    isLoading,
    weatherData,
    isSearchClicked,
    width,
    setSearchClicked }: typeLandingWeather) {

    const [isLocatorSet, setLocator] = useState(false); // This is a state that is used to determine if the locator button is clicked or not
    const [inputValue, setInputValue] = useState(''); // This is a state that is used to store the value of the input field
    const [searchAutoCompletion, setSearchAutoCompletion] = useState<QueryResultRow[]>([]); // This is a state that is used to store the search auto completion data
    const [isMobileSearchBarClicked, setMobileSearchBarClicked] = useState(false); // This is a state that is used to determine if the search bar is clicked or not

    useEffect(() => {
        const fetchSearchAutoCompletion = async () => {
            if (inputValue === '') return;
            const response = await querySearchAutoCompletion(inputValue);
            setSearchAutoCompletion(response);
        }
        fetchSearchAutoCompletion();
    }, [inputValue]);


    return (
        <div className="relative w-full h-full min-h-[400px] sm:min-h-full sm:row-span-2">
            <Modal isShown={isMobileSearchBarClicked && width < 640} setShown={setMobileSearchBarClicked}>
                <p className="text-white">hey</p>
            </Modal>
            <div className="relative w-full h-full bg-zinc-800 rounded-md flex flex-col justify-end cursor-default p-6">
                {(isLoading || Object.keys(weatherData).length <= 0) ? <SkeletonLoader /> : <WeatherWithData setMobileSearchBarClicked={setMobileSearchBarClicked} setSelectedCity={setSelectedCity} searchAutoCompletion={searchAutoCompletion} inputValue={inputValue} setInputValue={setInputValue} capitalizeWords={capitalizeWords} convertKelvinToCel={convertKelvinToCel} isLocatorSet={isLocatorSet} setLocator={setLocator} handleLocationClick={handleLocationClick} weatherData={weatherData} isSearchClicked={isSearchClicked} setSearchClicked={setSearchClicked} width={width} />}
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


function WeatherWithData({
    setMobileSearchBarClicked,
    setSelectedCity,
    searchAutoCompletion,
    inputValue,
    setInputValue,
    capitalizeWords,
    convertKelvinToCel,
    isLocatorSet,
    setLocator,
    handleLocationClick,
    weatherData,
    isSearchClicked,
    setSearchClicked,
    width }: typeLandingWeatherWithData) {

    if (weatherData["data"] === undefined) return null;

    const handleLocator = () => {
        setLocator(true);
        handleLocationClick();
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
    }

    const handleSearchClick = () => {
        setSearchClicked(prevVal => !prevVal)
        setInputValue('');
    }

    const handleSearchBarMobileClick = () => {
        width < 640 ? setMobileSearchBarClicked(true) : setMobileSearchBarClicked(false);
    }

    return (
        <>
            <motion.div className="absolute right-0 top-6 group rounded-full flex flex-col space-y-2 px-6 py-3 sm:p-6 w-[300px] sm:w-[350px]">
                <div className="flex flex-row-reverse items-center cursor-pointer">
                    <motion.div whileTap={{ scale: 1.05 }} whileHover={{ scale: 1.2 }} className="p-2" onClick={handleSearchClick}>
                        {isSearchClicked ? <X color="#fff" size={22} /> : <Search color="#fff" size={22} />}
                    </motion.div>

                    <AnimatePresence>
                        {isSearchClicked && <motion.input readOnly={width < 640} onClick={handleSearchBarMobileClick} value={inputValue} onChange={handleInputChange} placeholder="e.g. New York" initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }} className="bg-zinc-700 mr-2 p-2 px-4 placeholder:text-[#fff] rounded-full hover:bg-zinc-600 text-[#fff] text-sm outline border-0 outline-0" />}
                    </AnimatePresence>
                </div>
                <AnimatePresence>
                    {width > 640 && isSearchClicked && inputValue !== '' && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.1 }} layout className="w-full overflow-x-scroll max-h-[150px] bg-zinc-700 rounded-lg text-white flex flex-col overflow-y-scroll">
                            {searchAutoCompletion.map((item, index) => (
                                <motion.div onClick={() => setSelectedCity({ name: item.name as string, cou_name_en: item.cou_name_en as string, lat: item.lat as number, lon: item.lon as number })} layout key={index} className="w-full px-4 py-2 hover:bg-zinc-600 cursor-pointer">
                                    <p className="text-sm">{item["name"]}, {item["cou_name_en"]}, {Number(item["lat"]).toFixed(2)}, {Number(item["lon"]).toFixed(2)} </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div className="w-full flex flex-col space-y-4 pb-4">
                <div className="text-[#fff] flex">
                    <p className="text-5xl sm:text-6xl">{Math.round(convertKelvinToCel(weatherData["data"]["current"]["temp"]))}</p>
                    <p className="text-2xl sm:text-2xl">°C</p>
                </div>
                <div className="flex space-x-2 space-x-4 items-center">
                    <Image src={`/animated/${weatherData["data"]["current"]["weather"][0]["icon"]}.svg`} width={width > 640 ? 32 : 35} height={width > 640 ? 32 : 35} alt="open1" />
                    <p className="text-[#fff] text-xs sm:text-lg">{capitalizeWords(weatherData["data"]["current"]["weather"][0]["description"])}</p>
                </div>
            </div>
            <div className="w-full flex flex-col space-y-2 pt-4 border-t-[1px] border-t-zinc-700">
                <div className="w-full flex justify-between items-center">
                    <div className="flex space-x-2 items-center">
                        <MapPin size={20} color="#fff" />
                        <p className="text-[#fff] text-xs sm:text-base">{weatherData["_normalized_city"]}, {weatherData["ISO_3166-1_alpha-2"]}</p>
                    </div>
                    <motion.div whileTap={{ scale: 1.05 }} whileHover={{ scale: 1.2 }} className="p-2">
                        <Navigation onClick={handleLocator} fill={isLocatorSet ? "#fff" : "#27272a"} color="#fff" size={20} />
                    </motion.div>
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