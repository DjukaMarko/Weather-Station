import { Droplets, Sun, Sunset } from "lucide-react";
import { Progress } from "./progress";
import { useContext } from "react";
import { WeatherContext } from "../misc/WeatherContext";
import Skeleton from "react-loading-skeleton";

export default function AdditionalWeatherInfo() {
    const { isLoadingData, weatherData } = useContext(WeatherContext);
    return (
        <div className="relative w-full h-full min-h-[600px] sm:min-h-[400px] xl:min-h-fit xl:col-start-2 xl:row-start-1 xl:row-span-2">
            <div className="relative w-full h-full bg-zinc-800 rounded-md flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2 justify-center items-center p-3">
               {(isLoadingData || Object.keys(weatherData).length <= 0) ? <SkeletonLoader /> : <AdditionalChildren /> }
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
        <>
            <div className="relative w-full sm:w-auto sm:h-full flex-1 bg-[#39393d] flex items-center rounded-lg text-white">
                <div className="absolute top-4 left-4 flex flex-col space-y-3 sm:space-y-6">
                    <div className="flex space-x-2 items-center">
                        <Skeleton baseColor="#515157" highlightColor="#67676e" width={24} height={24} />
                        <Skeleton baseColor="#515157" highlightColor="#67676e" width={24} height={24} />
                    </div>
                    <div className="text-3xl sm:text-5xl md:text-6xl"><Skeleton baseColor="#515157" highlightColor="#67676e" width={100} height={40} /></div>
                </div>
                <div className="absolute bottom-4 left-4 text-sm"><Skeleton baseColor="#515157" highlightColor="#67676e" width={100} height={24} /></div>
            </div>

            <div className="relative w-full sm:w-auto sm:h-full flex-1 bg-[#39393d] flex items-center rounded-lg text-white">
                <div className="absolute top-4 left-4 flex flex-col space-y-3 sm:space-y-6">
                    <div className="flex space-x-2 items-center">
                        <Skeleton baseColor="#515157" highlightColor="#67676e" width={24} height={24} />
                        <Skeleton baseColor="#515157" highlightColor="#67676e" width={24} height={24} />
                    </div>
                    <div className="text-3xl sm:text-5xl md:text-6xl"><Skeleton baseColor="#515157" highlightColor="#67676e" width={100} height={40} /></div>
                </div>
                <div className="absolute bottom-4 left-4 text-sm"><Skeleton baseColor="#515157" highlightColor="#67676e" width={100} height={24} /></div>
            </div>

            <div className="relative w-full sm:w-auto sm:h-full flex-1 bg-[#39393d] flex items-center rounded-lg text-white">
                <div className="absolute top-4 left-4 flex flex-col space-y-3 sm:space-y-6">
                    <div className="flex space-x-2 items-center">
                        <Skeleton baseColor="#515157" highlightColor="#67676e" width={24} height={24} />
                        <Skeleton baseColor="#515157" highlightColor="#67676e" width={24} height={24} />
                    </div>
                    <div className="text-3xl sm:text-5xl md:text-6xl"><Skeleton baseColor="#515157" highlightColor="#67676e" width={100} height={40} /></div>
                </div>
                <div className="absolute bottom-4 left-4 text-sm"><Skeleton baseColor="#515157" highlightColor="#67676e" width={100} height={24} /></div>
            </div>
        </>
    )
}

/**
 * convertTimestampToTime function converts a timestamp to a time string in AM/PM format.
 *
 * @param {number} timestamp - The timestamp to convert.
 * @returns {string} The formatted time string.
 */
function convertTimestampToTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();

    const timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');

    return timeString;
}

function mapUVIndexToCategory(uvIndex: number): string {
    if (uvIndex >= 0 && uvIndex <= 2) {
        return "Low";
    } else if (uvIndex >= 3 && uvIndex <= 5) {
        return "Moderate";
    } else if (uvIndex >= 6 && uvIndex <= 7) {
        return "High";
    } else if (uvIndex >= 8 && uvIndex <= 10) {
        return "Very High";
    } else {
        return "Extreme";
    }
}

function AdditionalChildren() {
    const { convertKelvinToCel, weatherData } = useContext(WeatherContext);
    return (
        <>
            <div className="relative w-full sm:w-auto sm:h-full flex-1 bg-[#39393d] flex items-center rounded-lg text-white">
                <div className="absolute top-4 left-4 flex flex-col space-y-3 sm:space-y-6">
                    <div className="flex space-x-2 items-center">
                        <Droplets color="white" />
                        <p>Humidity</p>
                    </div>
                    <p className="text-3xl sm:text-5xl md:text-6xl">{weatherData["data"]["current"]["humidity"]}%</p>
                </div>
                <p className="absolute bottom-4 left-4 text-sm">The dew point is {Math.round(convertKelvinToCel(weatherData["data"]["current"]["dew_point"]))}° right now.</p>
            </div>


            <div className="relative w-full sm:w-auto sm:h-full flex-1 bg-[#39393d] flex items-center rounded-lg text-white">
                <div className="absolute top-4 left-4 flex flex-col space-y-3 sm:space-y-6">
                    <div className="flex space-x-2 items-center">
                        <Sunset color="white" />
                        <p>Sunset</p>
                    </div>
                    <p className="text-3xl sm:text-5xl md:text-6xl">{convertTimestampToTime(weatherData["data"]["current"]["sunset"] as number + weatherData["data"]["timezone_offset"] as number)}</p>
                </div>
                <p className="absolute bottom-4 left-4 text-sm">Sunrise: {convertTimestampToTime(weatherData["data"]["current"]["sunrise"] as number + weatherData["data"]["timezone_offset"] as number)}</p>
            </div>


            <div className="relative w-full sm:w-auto sm:h-full flex-1 bg-[#39393d] flex items-center rounded-lg text-white">
                <div className="absolute top-4 left-4 flex flex-col space-y-3 sm:space-y-6">
                    <div className="flex space-x-2 items-center">
                        <Sun color="white" />
                        <p>UV Index</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <p className="text-2xl sm:text-5xl md:text-6xl">{Math.round(weatherData["data"]["current"]["uvi"])}</p>
                        <p className="text-xl sm:text-xl md:text-2xl">{mapUVIndexToCategory(Math.round(weatherData["data"]["current"]["uvi"]))}</p>
                    </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex flex-col space-y-2 sm:space-y-6">
                    <Progress value={Math.round(weatherData["data"]["current"]["uvi"]) * 10} className="bg-[#515157]" color="white" />
                    <p className="text-sm">Use sun protection if necessary.</p>
                </div>
            </div>
        </>
    )
}