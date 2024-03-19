"use client"

import { useEffect, useState } from "react";
import useWindowDimensions from "@/components/hooks/useWindowDimensions";
import LandingWeather from "@/components/ui/LandingWeather";
import LandingDailyInfo from "@/components/ui/LandingDailyInfo";
import Modal from "@/components/ui/Modal";

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
            "_normalized_city": dataTown.components["_normalized_city"],
            "ISO_3166-1_alpha-2": dataTown.components["ISO_3166-1_alpha-2"]
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
    <div className="relative z-[-1] w-full h-full grid grid-cols-1 grid-rows-4 gap-2 xl:grid-cols-2 2xl:grid-cols-3 p-2">
      <LandingWeather weatherData={weatherData} isSearchClicked={isSearchClicked} setSearchClicked={setSearchClicked} width={width} />
      <LandingDailyInfo width={width} />
    </div>
  );
}
