"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Page() {

  const [isLoadingData, setLoadingData] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<any>({});


  useEffect(() => {

    function handleLocationClick() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
    
          /*const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_SECRET}`);
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


  function triggerError() {
    throw new Error("This is a test error for testing error handling.");
  }
  return (
    <div className="z-[-1] w-full h-full flex flex-col space-y-4 sm:grid sm:grid-cols-2 xl:grid-cols-3 sm:grid-rows-2">
      <div className="relative w-full h-full p-4 row-span-2">
        <div className="w-full h-full bg-zinc-800 rounded-2xl p-4 ">
          {isLoadingData ? <p className="text-white">loading...</p> : <p className="text-white"> WeatherData: {JSON.stringify(weatherData.current)} </p>}
          <Button variant={"destructive"} className="text-white" onClick={triggerError}>Trigger an Error</Button>
        </div>
      </div>
    </div>
  );
}
