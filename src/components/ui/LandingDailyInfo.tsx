import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

import Modal from "./Modal"
import { useContext, useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import Image from "next/image";
import { motion } from "framer-motion";
import { typeDailyInfoData, typeLandingDailyInfo } from "@/lib/definitions";

// @ts-ignore
import Trend from 'react-trend';
import { WeatherContext } from "../misc/WeatherContext";


/**
 * Renders the LandingDailyInfo component.
 * 
 * @param capitalizeWords - A function to capitalize words.
 * @param convertKelvinToCel - A function to convert temperature from Kelvin to Celsius.
 * @param isLoading - A boolean indicating whether the data is loading.
 * @param width - The width of the component.
 * @param weatherData - The weather data to be displayed.
 * @returns The rendered LandingDailyInfo component.
 */

export default function LandingDailyInfo({ capitalizeWords }: typeLandingDailyInfo) {
    const { width, isLoadingData, weatherData, convertKelvinToCel } = useContext(WeatherContext);
    const [isShownModal, setShownModal] = useState(false);
    return (
        <div className="relative w-full h-full min-h-[400px] xl:min-h-fit xl:col-start-1 xl:row-span-2">
            {weatherData["data"] !== undefined &&
                <Modal isShown={isShownModal} setShown={setShownModal}>
                    <Table className="w-full h-full">
                        <TableBody className="text-white">
                            {weatherData["data"]["daily"].map((el: any, index: number) => {
                                return (
                                    <TableRow className="border-zinc-700 border-b-[1px] hover:bg-zinc-900" key={index}>
                                        <TableCell className="md:px-10"><Image className="my-2" src={`/animated/${weatherData["data"]["daily"][index]["weather"][0]["icon"]}.svg`} width={width > 640 ? 40 : 32} height={width > 640 ? 40 : 32} alt={`open${index}`} /></TableCell>
                                        <TableCell className="md:px-10">
                                            <div className="flex items-end">
                                                <p className="text-sm sm:text-lg lg:text-2xl">{Math.round(convertKelvinToCel(weatherData["data"]["daily"][index]["temp"]["max"]))}°/</p>
                                                <p className="text-xs sm:text-base lg:text-lg">{Math.round(convertKelvinToCel(weatherData["data"]["daily"][index]["temp"]["min"]))}°</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="md:px-10"><p className="text-sm sm:text-base lg:text-lg">{convertTimestampToDate(weatherData["data"]["daily"][index]["dt"])["monthDay"]}</p></TableCell>
                                        <TableCell className="md:px-10"><p className="text-sm sm:text-base lg:text-lg">{convertTimestampToDate(weatherData["data"]["daily"][index]["dt"])["dayOfWeek"]}</p></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Modal>
            }
            <div className="w-full h-full bg-zinc-800 rounded-md cursor-pointer overflow-hidden relative">
                {(isLoadingData || Object.keys(weatherData).length <= 0) ? <SkeletonLoader /> : <DailyInfoWithData capitalizeWords={capitalizeWords} setShownModal={setShownModal} />}
            </div>
        </div>
    )
}
/**
 * Renders the skeleton loader component.
 * 
 * @returns The rendered SkeletonLoader component.
 */

function SkeletonLoader() {
    return (
        <>
            <div className="absolute z-[1] w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>
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

/**
 * Converts a timestamp to date.
 * 
 * @param timestamp - The timestamp to be converted.
 * @returns An object containing the month and day of the converted timestamp.
 */
function convertTimestampToDate(timestamp: number): { monthDay: string, dayOfWeek: string } {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const date = new Date(timestamp * 1000);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const dayOfWeek = daysOfWeek[date.getDay()];

    return {
        monthDay: `${month} ${day}`,
        dayOfWeek: dayOfWeek
    };
}

/**
 * Renders the DailyInfoWithData component.
 * 
 * @param capitalizeWords - A function to capitalize words.
 * @param convertKelvinToCel - A function to convert temperature from Kelvin to Celsius.
 * @param setShownModal - A function to set the visibility of the modal.
 * @param width - The width of the component.
 * @param weatherData - The weather data to be displayed.
 * @returns The rendered DailyInfoWithData component.
 */

function DailyInfoWithData({ capitalizeWords, setShownModal }: typeDailyInfoData) {
    const { width, weatherData, convertKelvinToCel } = useContext(WeatherContext);
    if (weatherData["data"] === undefined) return null;
    return (
        <div>
            <motion.div layout onClick={() => setShownModal(true)} className="absolute z-[1] hover:to-black/80 w-full h-full bg-gradient-to-b from-transparent to-black/50"></motion.div>
            <div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1.04 }} className="absolute w-[90%] h-20 md:h-24 rounded-xl bottom-4 left-0 right-0 m-auto bg-zinc-800 z-[2] flex items-center justify-between px-6">
                    <div className="h-full flex space-x-6 items-center">
                        <Image src={`/animated/${weatherData["data"]["daily"][1]["weather"][0]["icon"]}.svg`} width={width > 640 ? 48 : 40} height={width > 640 ? 48 : 40} alt="open3" />
                        <div className="flex flex-col">
                            <p className="text-white text-xs md:text-sm">Tomorrow</p>
                            <p className="text-white text-md md:text-2xl">{Math.round(convertKelvinToCel(weatherData["data"]["daily"][1]["temp"]["day"]))}°</p>
                            <p className="text-white text-xs md:text-xs">{capitalizeWords(weatherData["data"]["daily"][1]["weather"][0]["description"])}</p>
                        </div>
                    </div>
                    <Trend
                        className="w-28 sm:w-32 md:w-48 2xl:w-64 h-full"
                        data={weatherData["data"]["hourly"].map((el: any) => Math.round(convertKelvinToCel(el["temp"])))}
                        smooth
                        radius={10}
                        gradient={Math.round(convertKelvinToCel(weatherData["data"]["current"]["temp"])) < 15 ? ['#30a0fc','#5315bf'] : ['yellow', 'orange', 'red']}
                        strokeLinecap={'round'}
                        strokeWidth={2}
                    />
                </motion.div>
                <div className="px-6 py-2">
                    <Table>
                        <TableBody className="text-white">
                            {weatherData["data"]["daily"].map((el: any, index: number) => {
                                return (
                                    <TableRow className="border-zinc-700 border-b-[1px]" key={index}>
                                        <TableCell><Image className="my-2" src={`/animated/${weatherData["data"]["daily"][index]["weather"][0]["icon"]}.svg`} width={width > 640 ? 40 : 32} height={width > 640 ? 40 : 32} alt={`open${index}`} /></TableCell>
                                        <TableCell>
                                            <div className="flex items-end">
                                                <p className="text-sm sm:text-lg lg:text-2xl">{Math.round(convertKelvinToCel(weatherData["data"]["daily"][index]["temp"]["max"]))}°/</p>
                                                <p className="text-xs sm:text-base lg:text-lg">{Math.round(convertKelvinToCel(weatherData["data"]["daily"][index]["temp"]["min"]))}°</p>
                                            </div>
                                        </TableCell>
                                        <TableCell><p className="text-sm sm:text-base lg:text-lg">{convertTimestampToDate(weatherData["data"]["daily"][index]["dt"])["monthDay"]}</p></TableCell>
                                        <TableCell><p className="text-sm sm:text-base lg:text-lg">{convertTimestampToDate(weatherData["data"]["daily"][index]["dt"])["dayOfWeek"]}</p></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}   