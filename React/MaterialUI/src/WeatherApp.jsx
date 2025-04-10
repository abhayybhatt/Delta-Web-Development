import './WeatherApp.css';
import SearchBox from './SearchBox';
import InfoBox from './InfoBox';
import { useState } from 'react';

export default function WeatherApp () {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Mumbai",
        temp: 25.99,
        tempMin: 25.94,
        tempMax: 25.99,
        humidity: 53,
        feelsLike: 25.99,
        weather: "smoke",
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo); //nayi result object add ho jayegi weatherInfo state variable mein. Wo jo result object hai usmein bhi isi tarah weather ki kuch information hogi jo abhi weatherInfo naam ke state variable ke andar initially set hai.

        //Ab jaise hi re-rendering hogi, InfoBox ke andar nayi information in the form of an object, jayegi. Thus hamare pass updated information fir show hogi.
    }

    return (
        <div className="WeatherApp">
            <h2>Weather App</h2>
            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />
        </div>
    );
}