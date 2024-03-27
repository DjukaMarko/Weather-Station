import Image from "next/image";
import { useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { useDraggable } from "react-use-draggable-scroll";

export default function HourlyWeatherInfo({ isLoading, weatherData, convertKelvinToCel, width }: { isLoading: boolean, weatherData: any, convertKelvinToCel: (kelvin: number) => number, width: number }) {
    return (
        <div className="relative w-full h-full min-h-[150px] xl:min-h-fit xl:col-start-1 xl:row-span-1">
            {(isLoading || Object.keys(weatherData).length <= 0) ? <SkeletonLoader /> : <HourlyWeatherWithData weatherData={weatherData} convertKelvinToCel={convertKelvinToCel} width={width} /> }
        </div>
    )
}

/**
 * SkeletonLoader component displays a skeleton loader while the weather data is loading.
 *
 * @component
 * @returns {JSX.Element} The skeleton loader component.
 */
function SkeletonLoader() {
    return (
        <div className="relative w-full h-full bg-zinc-800 rounded-md flex space-x-8 items-center p-6 overflow-x-hidden">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, index) => {
                return (
                    <div key={index} className="flex flex-col items-center space-y-2 text-white">
                        <Skeleton baseColor="#3f3f46" highlightColor="#52525b" width={60} height={24} />
                        <Skeleton baseColor="#3f3f46" highlightColor="#52525b" width={60} height={48} />
                        <Skeleton baseColor="#3f3f46" highlightColor="#52525b" width={60} height={24} />
                    </div>
                )
            })}
        </div>
    )
}


function HourlyWeatherWithData({ weatherData, convertKelvinToCel, width }: { weatherData: any, convertKelvinToCel: (kelvin: number) => number, width: number }) {
    const ref =
        useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events: events } = useDraggable(ref, {
        applyRubberBandEffect: true,
    });
    return (
        <div {...events} ref={ref} className="relative w-full h-full select-none bg-zinc-800 rounded-md flex space-x-8 items-center p-6 overflow-x-scroll scrollbar-hide">
            {weatherData["data"]["hourly"].map((hourly: any, index: number) => {
                return (
                    <div key={index} onDragStart={(e) => e.preventDefault()} className="flex flex-col items-center space-y-2 text-white">
                        <p className="text-sm sm:text-base">{index === 0 ? "Now" : new Date((hourly["dt"] as number + weatherData["data"]["timezone_offset"] as number) * 1000).getHours().toString().padStart(2, '0') + ":00"}</p>
                        <Image src={`/animated/${hourly["weather"][0]["icon"]}.svg`} width={width > 640 ? 36 : 30} height={width > 640 ? 36 : 30} alt="open1" />
                        <p className="text-sm sm:text-base">{Math.round(convertKelvinToCel(hourly["temp"]))}°</p>
                    </div>
                )
            })}
        </div>
    )
}