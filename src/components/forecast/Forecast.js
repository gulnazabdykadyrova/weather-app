import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Conditions from "../conditions/Conditions";
import classes from "./Forecast.module.css";
import { FaGlobe } from "react-icons/fa";

const Forecast = () => {
  const [response, setResponse] = useState([]);

  const id = Math.random();

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=40.730610&lon=-73.935242&exclude=hourly,current,alerts,minutely&appid=548994bb8c991f91c75cbdddda7694eb&units=metric"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("test: ", data);
        const dayOfTheWeek = [];
        for (let i = 0; i < 7; i++) {
          dayOfTheWeek.push({
            date: data.daily[i].dt,
            day: data.daily[i].temp.day,
            icon: data.daily[i].weather.map((el) => el.icon),
            description: data.daily[i].weather.map((el) => el.description),
            tempMax: data.daily[i].temp.max,
            tempMin: data.daily[i].temp.min,
            humidity: data.daily[i].humidity,
            UV: data.daily[i].uvi,
            sunrise: data.daily[i].sunrise,
            sunset: data.daily[i].sunset,
            rain: data.daily[i].rain,
            wind_speed: data.daily[i].wind_speed,
            id: Math.random(),
            expand: "hidden",
          });
        }
        console.log(dayOfTheWeek);
        setResponse(dayOfTheWeek);
      });
  }, []);

  return (
    <Fragment>
      <div className={classes.navbarDescription}>
        <h3> Weekly weather- New York City, NY</h3>

        <div className={classes.navbarBox}>
          <div className={classes.globeIcon}>
            <FaGlobe />{" "}
          </div>
          <button className={classes.farenheit}>&#176;F | </button>
          <button className={classes.celcius}>&#176;C</button>
        </div>
      </div>
      <div className={classes.mainContainer}>
        {response.map((item) => {
          return (
            <ul className={classes.ul}>
              <li>
                <Conditions data={item} id={item.id} />
                <hr></hr>
              </li>
            </ul>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Forecast;
