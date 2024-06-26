/**
 * Represents a user.
 */
type User = {
    id: number;
    email: string;
    password: string;
};

/**
 * Represents the prop types for a mobile component.
 */
type MobilePropTypes = {
    isSigningOut: boolean;
    handleSignOut: (e: FormEvent<HTMLFormElement>) => void;
}

/**
 * Represents the prop types for a mobile component with additional properties.
 */
interface MTypes extends MobilePropTypes {
    isClicked: boolean;
    setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Represents the prop types for a mobile options component with additional properties.
 */
interface MOptionsTypes extends MobilePropTypes {
    isClicked: boolean;
    handleClick: () => void;
}

/**
 * Represents the structure of an object used to fetch city data.
 */
interface searchCity {
    name: string;
    cou_name_en: string;
    lat: number;
    lon: number;
}

/**
 * Represents the prop types for a landing daily info component with additional properties.
 */
interface typeLandingDailyInfo {
    capitalizeWords: (input: string) => string;
}

/**
 * Represents the prop types for a daily info data component with additional properties.
 */
interface typeDailyInfoData {
    capitalizeWords: (input: string) => string;
    setShownModal: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Represents the prop types for a landing weather with data component with additional properties.
 */
interface typeLandingWeatherWithData {
    setSelectedCity: React.Dispatch<React.SetStateAction<{ name: string, cou_name_en: string, lat: number, lon: number }>>;
    searchAutoCompletion: QueryResultRow[];
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    capitalizeWords: (input: string) => string;
    handleLocationClick: () => void;
    isSearchClicked: boolean;
    setSearchClicked: React.Dispatch<React.SetStateAction<boolean>>;
    isLocatorSet: boolean;
    setLocator: React.Dispatch<React.SetStateAction<boolean>>;
    setMobileSearchBarClicked: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Represents the prop types for a landing weather component with additional properties.
 */
interface typeLandingWeather {
    setSelectedCity: React.Dispatch<React.SetStateAction<{ name: string, cou_name_en: string, lat: number, lon: number }>>;
    capitalizeWords: (input: string) => string;
    handleLocationClick: () => void;
    isSearchClicked: boolean;
    setSearchClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

interface WeatherContextType {
    width: number;
    isLoadingData: boolean;
    weatherData: any;
    convertKelvinToCel: (temp: number) => number;
    formatDateForOffset: (timestamp: number, offset: number) => {
        MMDDYYYY: string;
        HHMM: string;
        monthYear: string;
        weekDay: string;
        monthDay: string;
    };
  }

export { User, MobilePropTypes, MTypes, MOptionsTypes, searchCity, typeLandingDailyInfo, typeDailyInfoData, typeLandingWeatherWithData, typeLandingWeather, WeatherContextType };
