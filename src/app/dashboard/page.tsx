"use client"

import { useEffect, useState } from "react";
import useWindowDimensions from "@/components/hooks/useWindowDimensions";
import LandingWeather from "@/components/ui/LandingWeather";

export default function Page() {
  const [isLoadingData, setLoadingData] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<any>({});
  const [isSearchClicked, setSearchClicked] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {

    function handleLocationClick() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          /* const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_SECRET}`);
           const data = await response.json();
        
           setWeatherData(data);*/
          setLoadingData(false);

        }, () => {
          throw new Error("Something went wrong while trying to access your location");
        });
      }
    }

    handleLocationClick();
  }, []);


  return (
    <div className="z-[-1] w-full bg-zinc-900 flex flex-col space-y-4 md:gap-4 md:space-y-0 md:grid md:grid-rows-2 md:grid-cols-2 xl:grid-cols-3 p-4 overflow-y-scroll">
      <LandingWeather isSearchClicked={isSearchClicked} setSearchClicked={setSearchClicked} width={width} />
      <LandingWeather isSearchClicked={isSearchClicked} setSearchClicked={setSearchClicked} width={width} />
      <LandingWeather isSearchClicked={isSearchClicked} setSearchClicked={setSearchClicked} width={width} />
    
      <div className="relative w-full h-full col-start-1"></div>
    </div>
  );
}
