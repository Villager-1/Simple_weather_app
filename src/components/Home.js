import React, { useState, useEffect} from 'react';
import Weather from './Weather';


const api = {
    key: "2470292b0eb426646422926f077b1fe8",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Home = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = event => {
        if (event.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&exclude=&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result);
            });
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div className='background'>
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 17) ? 'app warm' : 'app') : 'app'}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                <div>
                <div className="location-box">
                    <div className="location">{weather.name}, {weather.sys.country}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                    <div className="temp">
                    {Math.round(weather.main.temp)}°c
                    <div className="weather">{weather.weather[0].main}</div>
                    <div className='icon'>
                        <img src={' http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'}></img>
                    </div>
                    <Weather weatherData={weather}/>
                    </div>
                </div>
                </div>
                ) : ('')}
            </main>
        </div>
        </div>
    );

};
export default Home;
