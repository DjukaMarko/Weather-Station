"use client"

import { Button } from "@/components/ui/button";
import { CalendarDays, CloudDrizzle, CloudHail, MapPin, Navigation, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import useWindowDimensions from "@/components/hooks/useWindowDimensions";

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
    <div className="z-[-1] w-full flex flex-col space-y-4 sm:gap-4 sm:space-y-0 sm:grid sm:grid-cols-2 xl:grid-cols-3 sm:grid-rows-2 p-4">

      <div className="relative w-full h-full">
        <div className="w-full h-full bg-zinc-800 rounded-2xl px-6 py-2 flex flex-col items-center justify-end">

          <motion.div className="absolute right-0 top-6 group py-3 px-6 rounded-full cursor-pointer flex flex-row-reverse items-center">
            <motion.div whileTap={{ scale: 1.05 }} whileHover={{ scale: 1.2 }} className="p-2" onClick={() => setSearchClicked(prevVal => !prevVal)}>
              {isSearchClicked ? <X color="#d1d1d1" size={22} /> : <Search color="#d1d1d1" size={22} />}
            </motion.div>

            <AnimatePresence>
              {isSearchClicked && <motion.input placeholder="e.g. New York" initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: width>640 ? "100%": "10rem" }}
                exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }} className="bg-zinc-700 mr-2 p-2 px-4 placeholder:text-[#d1d1d1] rounded-full hover:bg-zinc-900 text-[#d1d1d1] text-sm outline border-0 outline-0" />}
            </AnimatePresence>

            <motion.div whileTap={{ scale: 1.05 }} whileHover={{ scale: 1.2 }} className="p-2">
              <Navigation color="#d1d1d1" size={22} />
            </motion.div>

          </motion.div>

          <div className="w-full flex flex-col space-y-3 py-6">
            <CloudDrizzle size={width > 640 ? 100 : 48} color="#d1d1d1" />
            <div className="text-[#d1d1d1] flex">
              <p className="text-5xl sm:text-7xl">28</p>
              <p className="text-2xl sm:text-3xl">°C</p>
            </div>
            <div className="flex space-x-2 items-center">
              <CloudHail color="#d1d1d1" size={24} />
              <p className="text-[#d1d1d1] text-xs sm:text-lg">Rainy Storm Clouds</p>
            </div>
          </div>
          <div className="w-full flex flex-col space-y-3 border-t-[1px] border-t-[#d1d1d1] py-6">
            <div className="flex space-x-2 items-center">
              <MapPin size={18} color="#d1d1d1" />
              <p className="text-[#d1d1d1] text-xs sm:text-sm">Florida, US</p>
            </div>
            <div className="flex space-x-2 items-center">
              <CalendarDays color="#d1d1d1" size={18} />
              <p className="text-[#d1d1d1] text-xs sm:text-sm">24 July, 2022</p>
              <p className="text-[#d1d1d1] text-xs sm:text-sm font-bold">5:01 AM</p>
            </div>
          </div>
        </div>
      </div>
    
      <div className="relative w-full h-full col-start-1">
        <div className="w-full h-full bg-zinc-800 rounded-2xl px-6 py-2 flex flex-col items-center justify-end">

          <motion.div className="absolute right-0 top-6 group py-3 px-6 rounded-full cursor-pointer flex flex-row-reverse items-center">
            <motion.div whileTap={{ scale: 1.05 }} whileHover={{ scale: 1.2 }} className="p-2" onClick={() => setSearchClicked(prevVal => !prevVal)}>
              {isSearchClicked ? <X color="#d1d1d1" size={22} /> : <Search color="#d1d1d1" size={22} />}
            </motion.div>

            <AnimatePresence>
              {isSearchClicked && <motion.input placeholder="e.g. New York" initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: width>640 ? "100%": "10rem" }}
                exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }} className="bg-zinc-700 mr-2 p-2 px-4 placeholder:text-[#d1d1d1] rounded-full hover:bg-zinc-900 text-[#d1d1d1] text-sm outline border-0 outline-0" />}
            </AnimatePresence>

            <motion.div whileTap={{ scale: 1.05 }} whileHover={{ scale: 1.2 }} className="p-2">
              <Navigation color="#d1d1d1" size={22} />
            </motion.div>

          </motion.div>

          <div className="w-full flex flex-col space-y-3 py-6">
            <CloudDrizzle size={width > 640 ? 100 : 48} color="#d1d1d1" />
            <div className="text-[#d1d1d1] flex">
              <p className="text-5xl sm:text-7xl">28</p>
              <p className="text-2xl sm:text-3xl">°C</p>
            </div>
            <div className="flex space-x-2 items-center">
              <CloudHail color="#d1d1d1" size={24} />
              <p className="text-[#d1d1d1] text-xs sm:text-lg">Rainy Storm Clouds</p>
            </div>
          </div>
          <div className="w-full flex flex-col space-y-3 border-t-[1px] border-t-[#d1d1d1] py-6">
            <div className="flex space-x-2 items-center">
              <MapPin size={18} color="#d1d1d1" />
              <p className="text-[#d1d1d1] text-xs sm:text-sm">Florida, US</p>
            </div>
            <div className="flex space-x-2 items-center">
              <CalendarDays color="#d1d1d1" size={18} />
              <p className="text-[#d1d1d1] text-xs sm:text-sm">24 July, 2022</p>
              <p className="text-[#d1d1d1] text-xs sm:text-sm font-bold">5:01 AM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-full">
        <div className="w-full h-full bg-zinc-800 rounded-2xl px-6 py-2 flex flex-col items-center justify-end">

          <motion.div className="absolute right-0 top-6 group py-3 px-6 rounded-full cursor-pointer flex flex-row-reverse items-center">
            <motion.div whileTap={{ scale: 1.05 }} whileHover={{ scale: 1.2 }} className="p-2" onClick={() => setSearchClicked(prevVal => !prevVal)}>
              {isSearchClicked ? <X color="#d1d1d1" size={22} /> : <Search color="#d1d1d1" size={22} />}
            </motion.div>

            <AnimatePresence>
              {isSearchClicked && <motion.input placeholder="e.g. New York" initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: width>640 ? "100%": "10rem" }}
                exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }} className="bg-zinc-700 mr-2 p-2 px-4 placeholder:text-[#d1d1d1] rounded-full hover:bg-zinc-900 text-[#d1d1d1] text-sm outline border-0 outline-0" />}
            </AnimatePresence>

            <motion.div whileTap={{ scale: 1.05 }} whileHover={{ scale: 1.2 }} className="p-2">
              <Navigation color="#d1d1d1" size={22} />
            </motion.div>

          </motion.div>

          <div className="w-full flex flex-col space-y-3 py-6">
            <CloudDrizzle size={width > 640 ? 100 : 48} color="#d1d1d1" />
            <div className="text-[#d1d1d1] flex">
              <p className="text-5xl sm:text-7xl">28</p>
              <p className="text-2xl sm:text-3xl">°C</p>
            </div>
            <div className="flex space-x-2 items-center">
              <CloudHail color="#d1d1d1" size={24} />
              <p className="text-[#d1d1d1] text-xs sm:text-lg">Rainy Storm Clouds</p>
            </div>
          </div>
          <div className="w-full flex flex-col space-y-3 border-t-[1px] border-t-[#d1d1d1] py-6">
            <div className="flex space-x-2 items-center">
              <MapPin size={18} color="#d1d1d1" />
              <p className="text-[#d1d1d1] text-xs sm:text-sm">Florida, US</p>
            </div>
            <div className="flex space-x-2 items-center">
              <CalendarDays color="#d1d1d1" size={18} />
              <p className="text-[#d1d1d1] text-xs sm:text-sm">24 July, 2022</p>
              <p className="text-[#d1d1d1] text-xs sm:text-sm font-bold">5:01 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
