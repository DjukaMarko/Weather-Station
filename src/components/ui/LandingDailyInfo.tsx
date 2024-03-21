import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

import Modal from "./Modal"
import { useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import Image from "next/image";
import { motion } from "framer-motion";

export default function LandingDailyInfo({ capitalizeWords, convertKelvinToCel, isLoading, width, weatherData }: { capitalizeWords: (input:string) => string, convertKelvinToCel: (kelvin:number) => number, isLoading: boolean, width: number, weatherData: any }) {
    const [isShownModal, setShownModal] = useState(false);
    return (
        <div className="relative w-full h-full col-start-1 row-start-3 row-span-2">
            {weatherData["data"] !== undefined &&
                <Modal isShown={isShownModal} setShown={setShownModal}>
                    <Table className="w-full h-full">
                        <TableBody className="text-white">
                            {weatherData["data"]["daily"].map((el: any, index: number) => {
                                return (
                                    <TableRow className="border-zinc-700 border-b-[1px] hover:bg-zinc-900" key={index}>
                                        <TableCell className="md:px-10"><Image src={`/animated/${weatherData["data"]["daily"][index]["weather"][0]["icon"]}.svg`} width={width > 640 ? 60 : 50} height={width > 640 ? 60 : 50} alt={`open${index}`} /></TableCell>
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
            <div className="w-full h-full bg-zinc-800 rounded-2xl cursor-pointer overflow-hidden relative">
                {(isLoading || Object.keys(weatherData).length <= 0) ? <SkeletonLoader /> : <DailyInfoWithData capitalizeWords={capitalizeWords} convertKelvinToCel={convertKelvinToCel} weatherData={weatherData} setShownModal={setShownModal} width={width} />}
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

function DailyInfoWithData({ capitalizeWords, convertKelvinToCel, setShownModal, width, weatherData }: { capitalizeWords: (input:string) => string, convertKelvinToCel: (kelvin:number) => number, setShownModal: React.Dispatch<React.SetStateAction<boolean>>, width: number, weatherData: any }) {
    if (weatherData["data"] === undefined) return null;
    return (
        <div>
            <motion.div layout onClick={() => setShownModal(true)} className="absolute z-[1] hover:to-black/80 w-full h-full bg-gradient-to-b from-transparent to-black/70"></motion.div>
            <div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale:1.04 }} className="absolute w-[90%] h-20 md:h-24 rounded-xl bottom-4 left-0 right-0 m-auto bg-zinc-800 z-[2] flex items-center space-x-4 p-4">
                    <Image src={`/animated/${weatherData["data"]["daily"][1]["weather"][0]["icon"]}.svg`} width={width > 640 ? 100 : 70} height={width > 640 ? 100 : 70} alt="open3" />
                    <div className="flex flex-col">
                        <p className="text-white text-xs md:text-sm">Tomorrow</p>
                        <p className="text-white text-md md:text-2xl">{Math.round(convertKelvinToCel(weatherData["data"]["daily"][1]["temp"]["day"]))}°</p>
                        <p className="text-white text-xs md:text-xs">{capitalizeWords(weatherData["data"]["daily"][1]["weather"][0]["description"])}</p>
                    </div>
                </motion.div>
                <div className="px-6 py-2">
                    <Table>
                        <TableBody className="text-white">
                            {weatherData["data"]["daily"].map((el: any, index: number) => {
                                return (
                                    <TableRow className="border-zinc-700 border-b-[1px]" key={index}>
                                        <TableCell><Image src={`/animated/${weatherData["data"]["daily"][index]["weather"][0]["icon"]}.svg`} width={width > 640 ? 60 : 50} height={width > 640 ? 60 : 50} alt={`open${index}`} /></TableCell>
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