import { Card } from "semantic-ui-react";

import classes from './Weather.module.css';


const Weather = ({weatherData}, ) => {
    return(
        <div className="card">
                <div className={classes.main}>
                    <div className={classes.temp}>
                        <p>Min: {weatherData.main.temp_min} °c</p>
                        <p>Max: {weatherData.main.temp_max} °c</p>
                        <p>Sunrise: {weatherData.sys.sunrise}</p>
                        <p>Sunset: {weatherData.sys.sunset}</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Pressure: {weatherData.main.pressure} mBar</p>
                        <p>Wind: {weatherData.wind.speed} km/h</p>
                    </div>
                    {/* <p>Description: {weatherData.weather[0].description}</p>*/}
                </div>
        </div>
    );
};

export default Weather;