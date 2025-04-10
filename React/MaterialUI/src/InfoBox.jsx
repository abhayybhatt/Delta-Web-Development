import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import './InfoBox.css';

export default function InfoBox ( {info} ) {
    const INIT_URL = 'https://plus.unsplash.com/premium_photo-1681803640795-5f36419e9c2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c21va2UlMjB3ZWF0aGVyfGVufDB8fDB8fHww';

    const SUMMER_URL = 'https://images.unsplash.com/photo-1648220073452-648960ffec43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN1bm55JTIwd2VhdGhlciUyMGluJTIwYSUyMGNpdHl8ZW58MHx8MHx8fDA%3D'; //if temp > 15 degree celsius.
    const WINTER_URL = 'https://images.unsplash.com/photo-1613416721420-1ab699c709d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2ludGVyJTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D'; //if temp < 15 degree celsius.
    const RAIN_URL = 'https://plus.unsplash.com/premium_photo-1676212747574-c401d596e853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmFpbnklMjB3ZWF0aGVyJTIwaW4lMjBhJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D'; //isko humidity ki value se check krenge. If humidity goes 80 +, aise mein koisi temperature ki condition check nhi krni hai, seedhe rainy weather.

    const RAIN_SNOWFALL_URL = 'https://images.unsplash.com/photo-1704695340772-e6eb8dea144a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFpbiUyMHdpdGglMjBzbm93ZmFsbHxlbnwwfHwwfHx8MA%3D%3D';

    // let info = { //ye openweatherapi se data abhi fetch kiya hai Mumbai ka, isko isliye use kr rhe hai kyuki baad mein to aisa hi data display kara ke dena hai SearchBox ko. Isliye isko as a sample banakr test kr rhe hai ki ye data kaise display kiya jaa sakta hai.
    //     city: "Mumbai",
    //     temp: 25.99,
    //     tempMin: 25.94,
    //     tempMax: 25.99,
    //     humidity: 53,
    //     feelsLike: 25.99,
    //     weather: "smoke",
    // }; //ab to sab kuch info prop ke form mein kr diya hai! WeatherApp se apne setWeather state variable object ke andar ka content yha pr info ke form mein aayega.

    return (
        <div className="InfoBox">
            {/*ab yha pr media card use kr rhe hai from Material Ui: */}
            <div className="CardContainer">
                <Card className="Card" sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={info.humidity > 80 ? (info.temp < 0 ? RAIN_SNOWFALL_URL : RAIN_URL) : (info.temp > 15 ? SUMMER_URL : WINTER_URL)} //sabse pehle to humidity hi check hogi. If it exceeds the value 80, to Rainy weather ka url set krenge. Agr nhi to ye check hoga ki temperature 15 degree celsius se greater hai ki nhi. Agr greater hai to Summer weather nhi to Winter weather url use hoga. Ab ek aur condition add ki di ki agr humidity high hai aur temperature bhi zyada low hai (below 0), to snowfall wala url use kr lenge.
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {info.city} {info.humidity > 80 ? <ThunderstormIcon /> : (info.temp > 15 ? <WbSunnyIcon /> : <AcUnitIcon />)} 
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={'span'}>
                            <p>Temperature: {info.temp}°C </p>
                            <p>Humidity: {info.humidity} </p>
                            <p>Min Temp: {info.tempMin}&deg;C </p>
                            <p>Max Temp: {info.tempMax}&deg;C </p>
                            <p>The weather can be described as <i> {info.weather} </i> and feels like {info.feelsLike}&deg;C</p> {/*kyuki html mein &deg; se bhi apan degree ka symbol la sakte hai. */}
                            <p></p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}