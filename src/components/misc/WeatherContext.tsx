import { WeatherContextType } from "@/lib/definitions";
import { createContext } from "react";

export const WeatherContext = createContext<WeatherContextType>({ width: 0, isLoadingData: true, weatherData: {}, convertKelvinToCel: () => 0 });