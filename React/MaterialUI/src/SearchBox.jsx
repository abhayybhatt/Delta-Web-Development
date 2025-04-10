// Building a Weather Widget: using React & Material UI.
// main task is to build a form(SearchBox hi form hone wala hai) that takes any geographical location(city) as an input, button to submit our request, and a weather api that provides the current weather condition at that location.
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css'
import { useState } from 'react';

export default function SearchBox({updateInfo}) {
    let[city, setCity] = useState(''); //kyuki form hai, thus state variables to uske saath React mein use krne hi padenge.
    let[error,setError] = useState(false); //for error handling purpose, agr koisi bhi aisi location search kr dein apan jiske coordinates GeoCoding api na provide kr paye.
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '1c569c9d888fbc3ff95a391c383f6a0b';

    let getWeatherInfo = async () => { //note: city varibale ki access har function ke pass automatically hoti hai agr wo sabse pehle likha jaata hai. Agr baad mein likha hota to yha parameter mein apan ko city state variable pass krna padta.
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`); //jis url ke pass request bhejni hai wo ban jayega ab. &units=metric isliye pass kiya kyuki by default nhi to F mein temperature aata, instead of C.
            let jsonResponse = await response.json();
            // console.log(jsonResponse); //ab is object ko console mein observe karo, aur ye decide karo ki apan ko kya-kya parameters usmein se store karane hai, aur usko apne new object mein store kr lo:
            let result = {
                city: city, //kyuki InfoBox mein iski need rhegi.
                temp: jsonResponse.main.temp, //console dekhkr pata chalega ki parameters ki exact location kya hai unko access krne ke liye.
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description, //weather ke array of object hai, iska 0th element ek object hai, jismein se apan ne description(haze, smoke, etc.) nikaal liya.
            };
            console.log(result);
            return result;
        } catch(err) {
            throw err;
        }
    };

    let handleChange = (event) => {
        setCity(event.target.value);
    };

    let handleSubmit = async (event) => {
        try{
            event.preventDefault();
        console.log(city);
        setCity('');
        let newInfo = await getWeatherInfo();//yaani form submission ke baad us city ki weatherInfo hi to chahiye to isko to call krna hi padega yha! Ab isko apan ek newInfo naam ke object mein store kara lenge.
        updateInfo(newInfo); //ab ye WeatherApp component ke weatherInfo state variable ko set kr dega apne newInfo object se, jo ki waha pr newInfo object se represented hai as a parameter in updateInfo() function.
        } catch(err){
            setError(true);
        }
    };

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}> {/*form banane ke liye, using material UI we'll be using text field from its website: */}
            <TextField className='SearchBar' id="city" label="City Name" variant="outlined" value={city} onChange={handleChange} required/>
            <br /><br />
            <Button  className='SearchBar' variant="contained" type="submit"> Search </Button>
            {error && <p style={{color:'red'}}>No such place found!</p>} {/*error handling, agr error state variable true hoga, tabhi ye error show honi hai webpage pr. */}
            </form>
        </div>
    );
}

// we'll be using this api: openweathermap.org/current -> 1000 free api calls per day!
// ab ismein latitude and longitudes as parameters lagenge, along with your api key. Lat aur Lon ke liye we'll be using Geocoding API. It'll provide us coordinates via city, state and/or country code.

// Ab components ke form mein sab break down krte hai: sabse upar to App component hi rhega, uske andar apna WeatherApp aayega. WeatherApp mein ek portion rhega SearchBox ka, dusra portion rhega  InfoBox, jaha information ko apan render karayenge.

// Flow aisa rhega ki WeatherApp dono hi components ko render karayega, SearchBox ke andar jo bhi data return hokr aayega, wo data WeatherApp ko pass ho jayega through some state variable. Us state variable ko define to WeatherApp mein krenge, aur SearchBox ke andar as a prop pass kr sakte hai. SearchBox us variable ki value ko set kr dega, fir usi state variable ko apan InfoBox component mein pass on kr denge as a prop, jo ki us information ko display karane ka kaam krega.