"use client"

import { useEffect, useState } from "react";
import useWindowDimensions from "@/components/hooks/useWindowDimensions";
import LandingWeather from "@/components/ui/LandingWeather";
import LandingDailyInfo from "@/components/ui/LandingDailyInfo";

interface searchCity { // This is an interface that is used to define the structure of the object which is used to fetch the city data
  name: string;
  cou_name_en: string
  lat: number;
  lon: number;
}

export default function Page() {
  const [isLoadingData, setLoadingData] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<{ [index: string]: (string | number) }>({});
  const [selectedCity, setSelectedCity] = useState<searchCity>({ name: "", cou_name_en: "", lat: 0, lon: 0 });
  const [isSearchClicked, setSearchClicked] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    handleLocationClick();
  }, []);

  useEffect(() => {
    setLoadingData(true);
    if (selectedCity.name === "") return;
    function fetchData() {
      fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${selectedCity.lat}&lon=${selectedCity.lon}&exclude=minutely%2Chourly&appid=${process.env.OPENWEATHER_SECRET}`)
        .then((response) => response.json())
        .then((data) => {
          const normalizedCity = {
            "_normalized_city": selectedCity.name,
            "ISO_3166-1_alpha-2": selectedCity.cou_name_en
          }

          setWeatherData(normalizedCity)
          setWeatherData(prev => ({ ...prev, data }));
          setSearchClicked(false);
          setLoadingData(false);
        });
    }

    fetchData();
  }, [selectedCity]);


  function convertKelvinToCel(kelvin: number): number {
    return kelvin - 273.15;
  }

  function capitalizeWords(input: string): string {
    return input.replace(/\b\w/g, (char) => char.toUpperCase());
  }


  function handleLocationClick() {
    setLoadingData(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely%2Chourly&appid=${process.env.OPENWEATHER_SECRET}`);
        const data = await response.json();

        const responseTown = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${process.env.OPENCAGE_API_KEY}`);
        const dataTown = (await responseTown.json()).results[0];

        const normalizedCity = {
          "_normalized_city": dataTown.components["_normalized_city"],
          "ISO_3166-1_alpha-2": dataTown.components["ISO_3166-1_alpha-2"]
        }

        setWeatherData(normalizedCity)
        setWeatherData(prev => ({ ...prev, data }));

        setLoadingData(false);

      }, () => {
        throw new Error("Something went wrong while trying to access your location");
      });
    }
  }

  return (
    <div className="relative z-[-1] w-full h-full flex flex-col space-y-1 sm:space-y-0 sm:grid sm:grid-cols-1 sm:grid-rows-4 sm:gap-1 xl:grid-cols-2 p-1 overflow-y-scroll">
      <LandingWeather
        setSelectedCity={setSelectedCity}
        convertKelvinToCel={convertKelvinToCel}
        capitalizeWords={capitalizeWords}
        handleLocationClick={handleLocationClick}
        isLoading={isLoadingData}
        weatherData={weatherData}
        isSearchClicked={isSearchClicked}
        setSearchClicked={setSearchClicked}
        width={width} />

      <LandingDailyInfo
        convertKelvinToCel={convertKelvinToCel}
        capitalizeWords={capitalizeWords}
        weatherData={weatherData}
        isLoading={isLoadingData}
        width={width} />
    </div>
  );
}
