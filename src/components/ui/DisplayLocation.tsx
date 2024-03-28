import dynamic from "next/dynamic";
import { useContext, useMemo } from "react";
import { WeatherContext } from "../misc/WeatherContext";
import Skeleton from "react-loading-skeleton";

export default function DisplayLocation() {
    const { isLoadingData, weatherData } = useContext(WeatherContext);

    const Map = useMemo(() => dynamic(
        () => import("@/components/ui/Map"),
        {
            loading: () => <p className="text-white">Please wait...</p>,
            ssr: false
        }
    ), [])

    return (
        <div className="relative w-full h-full min-h-[400px] xl:min-h-fit xl:col-start-2 xl:row-start-3 xl:row-span-3">
            <div className="relative w-full h-full bg-zinc-800 rounded-md flex justify-center items-center">
            {(isLoadingData || Object.keys(weatherData).length <= 0) ? <SkeletonLoader/> : <Map position={[weatherData["data"]["lat"] as number, weatherData["data"]["lon"] as number]} />}
            </div>
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
        <div className="relative w-full h-full bg-zinc-800 rounded-md">
            <div className="absolute top-4 left-4 flex flex-col">
                <Skeleton baseColor="#3f3f46" highlightColor="#52525b" width={32} height={32} />
                <Skeleton baseColor="#3f3f46" highlightColor="#52525b" width={32} height={32} />
            </div>
            <div className="absolute bottom-4 right-4">
                <Skeleton baseColor="#3f3f46" highlightColor="#52525b" width={128} height={32} />
            </div>
        </div>
    )
}