import { WeatherContext } from "@/app/dashboard/page";
import dynamic from "next/dynamic";
import { useContext, useMemo } from "react";

export default function DisplayLocation() {
    const { isLoadingData, weatherData } = useContext(WeatherContext);

    const Map = useMemo(() => dynamic(
        () => import("@/components/ui/Map"),
        { 
          loading: () => <p>A map is loading</p>,
          ssr: false
        }
      ), [])

    return (
        <div className="relative w-full h-full min-h-[400px] xl:min-h-fit xl:col-start-2 xl:row-start-3 xl:row-span-3">
            <div className="relative w-full h-full bg-zinc-800 rounded-md flex justify-center items-center">
                {(!isLoadingData || Object.keys(weatherData).length > 0) && <Map position={[weatherData["data"]["lat"] as number, weatherData["data"]["lon"] as number]} />}
            </div>
        </div>
    )
}