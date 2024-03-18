"use client"

import { useEffect, useState } from "react";
import useWindowDimensions from "@/components/hooks/useWindowDimensions";
import LandingWeather from "@/components/ui/LandingWeather";
import { CloudDrizzle } from "lucide-react";

export default function Page() {
  const [isLoadingData, setLoadingData] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<{ [index: string]: (string | number) }>({});
  const [isSearchClicked, setSearchClicked] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {

    function handleLocationClick() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          /*const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely%2Chourly&appid=${process.env.OPENWEATHER_SECRET}`);
          const data = await response.json();*/

          const responseTown = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${process.env.OPENCAGE_API_KEY}`);
          const dataTown = (await responseTown.json()).results[0];

          //console.log(data);
          const normalizedCity = {
            "_normalized_city" : dataTown.components["_normalized_city"],
            "ISO_3166-1_alpha-2" : dataTown.components["ISO_3166-1_alpha-2"]
          }

          setWeatherData(normalizedCity)
          //setWeatherData(prev => ({ ...prev, data }));
          setLoadingData(false);

        }, () => {
          throw new Error("Something went wrong while trying to access your location");
        });
      }
    }

    handleLocationClick();
  }, []);


  return (
    <div className="z-[-1] w-full h-full bg-zinc-900 grid grid-cols-1 grid-rows-4 gap-2 xl:grid-cols-2 2xl:grid-cols-3 p-2">
      <LandingWeather weatherData={weatherData} isSearchClicked={isSearchClicked} setSearchClicked={setSearchClicked} width={width} />

      <div className="relative w-full h-full col-start-1 row-start-3 row-span-2">
        <div className="relative w-full h-full">
          <div className="w-full h-full bg-zinc-800 rounded-2xl cursor-pointer overflow-hidden relative">
            <div className="absolute z-[1] w-full h-full bg-gradient-to-b from-transparent to-black/70"></div>
            <div className="absolute w-[90%] h-20 md:h-24 rounded-xl bottom-4 left-0 right-0 m-auto bg-zinc-800 z-[2] flex items-center space-x-4 p-4">
              <CloudDrizzle color="#fff" size={width > 640 ? 48 : 40} />
              <div className="flex flex-col">
                <p className="text-white text-xs md:text-sm">Tomorrow</p>
                <p className="text-white text-md md:text-2xl">23°</p>
                <p className="text-white text-xs md:text-xs">Thunder Storm day</p>
              </div>
            </div>
            <div className="flex flex-col space-y-4 p-6 md:px-10 md:py-7">
              {[1, 1, 1, 1, 1, 1].map((el, index) => {
                return (
                  <div key={index} className="flex w-full justify-between items-center text-white">
                    <CloudDrizzle size={width > 640 ? 50 : 40} color="#fff" />
                    <div className="flex items-end">
                      <p className="text-sm sm:text-lg lg:text-2xl">29°/</p>
                      <p className="text-xs sm:text-base lg:text-lg">18°</p>
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg">25 july</p>
                    <p className="text-sm sm:text-base lg:text-lg">Tuesday</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
