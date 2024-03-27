/**
 * Represents the main page component of the dashboard.
 * This component displays weather information and daily info.
 */
"use client"

import { useEffect, useState } from "react";
import useWindowDimensions from "@/components/hooks/useWindowDimensions";
import LandingWeather from "@/components/ui/LandingWeather";
import LandingDailyInfo from "@/components/ui/LandingDailyInfo";
import { searchCity } from "@/lib/definitions";
import HourlyWeatherInfo from "@/components/ui/HourlyWeatherInfo";

export default function Page() {
  /**
   * Represents the loading state of the weather data.
   */
  const [isLoadingData, setLoadingData] = useState<boolean>(true);

  /**
   * Represents the weather data.
   */
  const [weatherData, setWeatherData] = useState<{ [index: string]: (string | number) }>({});

  /**
   * Represents the selected city for weather information.
   */
  const [selectedCity, setSelectedCity] = useState<searchCity>({ name: "", cou_name_en: "", lat: 0, lon: 0 });

  /**
   * Represents the state of the search button click.
   */
  const [isSearchClicked, setSearchClicked] = useState(true);

  /**
   * Represents the width of the window.
   */
  const { width } = useWindowDimensions();

  useEffect(() => {
    handleLocationClick();
  }, []);

  useEffect(() => {
    setLoadingData(true);
    if (selectedCity.name === "") return;
    function fetchData() {
      fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${selectedCity.lat}&lon=${selectedCity.lon}&exclude=minutely&appid=${process.env.OPENWEATHER_SECRET}`)
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


  /**
   * Converts temperature from Kelvin to Celsius.
   * @param kelvin - The temperature in Kelvin.
   * @returns The temperature in Celsius.
   */
  function convertKelvinToCel(kelvin: number): number {
    return kelvin - 273.15;
  }

  /**
   * Capitalizes the first letter of each word in a string.
   * @param input - The input string.
   * @returns The capitalized string.
   */
  function capitalizeWords(input: string): string {
    return input.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  /**
   * Handles the click event for the location button.
   * Fetches weather data based on the user's current location.
   */
  function handleLocationClick() {
    setLoadingData(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${process.env.OPENWEATHER_SECRET}`);
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

  console.log(weatherData);

  return (
    <div className="relative z-[-1] w-full h-full flex flex-col space-y-1 xl:space-y-0 xl:grid xl:grid-cols-2 xl:grid-rows-5 xl:gap-1 p-1 overflow-y-scroll">
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

      <HourlyWeatherInfo 
        isLoading={isLoadingData}
        weatherData={weatherData}
        convertKelvinToCel={convertKelvinToCel}
        width={width}
      />

      <LandingDailyInfo
        convertKelvinToCel={convertKelvinToCel}
        capitalizeWords={capitalizeWords}
        weatherData={weatherData}
        isLoading={isLoadingData}
        width={width} />

      <div className="relative w-full h-full min-h-[400px] xl:min-h-fit xl:col-start-2 xl:row-start-1 xl:row-span-2">
        <div className="relative w-full h-full bg-zinc-800 rounded-md flex justify-center items-center">
          <p className="text-white text-2xl">TBD</p>
        </div>
      </div>
      <div className="relative w-full h-full min-h-[400px] xl:min-h-fit xl:col-start-2 xl:row-start-3 xl:row-span-3">
        <div className="relative w-full h-full bg-zinc-800 rounded-md flex justify-center items-center">
          <p className="text-white text-2xl">TBD</p>
        </div>
      </div>
    </div>
  );
}
