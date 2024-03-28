import Image from "next/image";
import { useContext, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { useDraggable } from "react-use-draggable-scroll";
import { WeatherContext } from "../misc/WeatherContext";

export default function HourlyWeatherInfo() {
    const { isLoadingData, weatherData } = useContext(WeatherContext);
    return (
        <div className="relative w-full h-full min-h-[150px] sm:min-h-[200px] xl:min-h-fit xl:col-start-1 xl:row-span-1">
            {(isLoadingData || Object.keys(weatherData).length <= 0) ? <SkeletonLoader /> : <HourlyWeatherWithData /> }
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


function HourlyWeatherWithData() {
    const { width, weatherData, convertKelvinToCel } = useContext(WeatherContext);
    const ref =
        useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events: events } = useDraggable(ref, {
        applyRubberBandEffect: true,
    });

    return (
        <div {...events} ref={ref} className="relative w-full h-full select-none bg-zinc-800 rounded-md flex space-x-8 items-center p-6 overflow-x-scroll overflow-y-hidden scrollbar-hide">
            {weatherData["data"]["hourly"].map((hourly: any, index: number) => {
                return (
                    <div key={index} onDragStart={(e) => e.preventDefault()} className="flex flex-col items-center space-y-2 text-white">
                        <p className="text-sm sm:text-base">{index === 0 ? "Now" : new Date((hourly["dt"] as number + weatherData["data"]["timezone_offset"] as number) * 1000).getHours().toString().padStart(2, '0') + ":00"}</p>
                        <div className="flex flex-col items-center space-y-1">
                            <Image className={`${hourly["rain"] === undefined ? "my-3" : "mb-1"}`} src={`/animated/${hourly["weather"][0]["icon"]}.svg`} width={width > 640 ? 36 : 25} height={width > 640 ? 36 : 25} alt="open1" />
                            {hourly["rain"] !== undefined && <p className="text-xs">{hourly["rain"]["1h"] as number}%</p> }
                        </div>
                        <p className="text-sm sm:text-base">{Math.round(convertKelvinToCel(hourly["temp"]))}°</p>
                    </div>
                )
            })}
        </div>
    )
}