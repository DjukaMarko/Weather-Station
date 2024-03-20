import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import Modal from "./Modal"
import { useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import Image from "next/image";

export default function LandingDailyInfo({ isLoading, width, weatherData }: { isLoading: boolean, width: number, weatherData: any }) {
    const [isShownModal, setShownModal] = useState(false);
    return (
        <div className="relative w-full h-full col-start-1 row-start-3 row-span-2">
            {weatherData["data"] !== undefined &&
                <Modal isShown={isShownModal} setShown={setShownModal}>
                    <Table className="w-full h-full">
                        <TableBody className="text-white">
                            {weatherData["data"]["daily"].map((el: any, index: number) => {
                                return (
                                    <TableRow className="border-zinc-700" key={index}>
                                        <TableCell className="md:px-10"><Image src={`https://openweathermap.org/img/wn/${weatherData["data"]["daily"][index]["weather"][0]["icon"]}@2x.png`} width={width > 640 ? 60 : 50} height={width > 640 ? 60 : 50} alt={`open${index}`} /></TableCell>
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
                {(isLoading || Object.keys(weatherData).length <= 0) ? <SkeletonLoader /> : <DailyInfoWithData weatherData={weatherData} isShownModal={isShownModal} setShownModal={setShownModal} width={width} />}
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

function convertKelvinToCel(kelvin: number): number {
    return kelvin - 273.15;
}

function capitalizeWords(input: string): string {
    return input.replace(/\b\w/g, (char) => char.toUpperCase());
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

function DailyInfoWithData({ isShownModal, setShownModal, width, weatherData }: { isShownModal: boolean, setShownModal: React.Dispatch<React.SetStateAction<boolean>>, width: number, weatherData: any }) {
    if (weatherData["data"] === undefined) return null;
    return (
        <div onClick={() => setShownModal(true)}>
            <div className="absolute z-[1] w-full h-full bg-gradient-to-b from-transparent to-black/70"></div>
            <div>
                <div className="absolute w-[90%] h-20 md:h-24 rounded-xl bottom-4 left-0 right-0 m-auto bg-zinc-800 z-[2] flex items-center space-x-4 p-4">
                    <Image src={`https://openweathermap.org/img/wn/${weatherData["data"]["daily"][1]["weather"][0]["icon"]}@2x.png`} width={width > 640 ? 100 : 70} height={width > 640 ? 100 : 70} alt="open3" />
                    <div className="flex flex-col">
                        <p className="text-white text-xs md:text-sm">Tomorrow</p>
                        <p className="text-white text-md md:text-2xl">{Math.round(convertKelvinToCel(weatherData["data"]["daily"][1]["temp"]["day"]))}°</p>
                        <p className="text-white text-xs md:text-xs">{capitalizeWords(weatherData["data"]["daily"][1]["weather"][0]["description"])}</p>
                    </div>
                </div>
                <div className="px-6 py-2">
                    <Table>
                        <TableBody className="text-white">
                            {weatherData["data"]["daily"].map((el: any, index: number) => {
                                return (
                                    <TableRow className="border-zinc-700" key={index}>
                                        <TableCell><Image src={`https://openweathermap.org/img/wn/${weatherData["data"]["daily"][index]["weather"][0]["icon"]}@2x.png`} width={width > 640 ? 60 : 50} height={width > 640 ? 60 : 50} alt={`open${index}`} /></TableCell>
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
                <div className="flex flex-col p-6 md:px-7 md:py-3 divide-y divide-zinc-700">
                    {weatherData["data"]["daily"].map((el: any, index: number) => {
                        return (
                            <div key={index} className="flex w-full justify-between items-center text-white">
                                <Image src={`https://openweathermap.org/img/wn/${weatherData["data"]["daily"][index]["weather"][0]["icon"]}@2x.png`} width={width > 640 ? 80 : 50} height={width > 640 ? 80 : 50} alt={`open${index}`} />
                                <div className="flex items-end">
                                    <p className="text-sm sm:text-lg lg:text-2xl">{Math.round(convertKelvinToCel(weatherData["data"]["daily"][index]["temp"]["max"]))}°/</p>
                                    <p className="text-xs sm:text-base lg:text-lg">{Math.round(convertKelvinToCel(weatherData["data"]["daily"][index]["temp"]["min"]))}°</p>
                                </div>
                                <p className="text-sm sm:text-base lg:text-lg">{convertTimestampToDate(weatherData["data"]["daily"][index]["dt"])["monthDay"]}</p>
                                <p className="text-sm sm:text-base lg:text-lg">{convertTimestampToDate(weatherData["data"]["daily"][index]["dt"])["dayOfWeek"]}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

/*
 <div key={index} className="flex w-full justify-between items-center text-white">
                                    <Image src={`https://openweathermap.org/img/wn/${weatherData["data"]["daily"][index]["weather"][0]["icon"]}@2x.png`} width={width > 640 ? 80 : 50} height={width > 640 ? 80 : 50} alt={`open${index}`} />
                                    <div className="flex items-end">
                                        <p className="text-sm sm:text-lg lg:text-2xl">{Math.round(convertKelvinToCel(weatherData["data"]["daily"][index]["temp"]["max"]))}°/</p>
                                        <p className="text-xs sm:text-base lg:text-lg">{Math.round(convertKelvinToCel(weatherData["data"]["daily"][index]["temp"]["min"]))}°</p>
                                    </div>
                                    <p className="text-sm sm:text-base lg:text-lg">{convertTimestampToDate(weatherData["data"]["daily"][index]["dt"])["monthDay"]}</p>
                                    <p className="text-sm sm:text-base lg:text-lg">{convertTimestampToDate(weatherData["data"]["daily"][index]["dt"])["dayOfWeek"]}</p>
                                </div>
*/