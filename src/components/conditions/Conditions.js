import React, { Fragment, useState, useEffect } from "react";
import classes from "./Conditions.module.css";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import {
  WiHumidity,
  WiDaySunny,
  WiSunrise,
  WiSunset,
  WiHail,
  WiStrongWind,
} from "react-icons/wi";

const Conditions = (props) => {
  const [data, setData] = useState(props.data);
  const [isExpanding, setIsExpanding] = useState(false);

  const id = props.id;
  console.log(data, id);

  const hour =
    data && `${new Date(data.date * 1000).getHours()}`.padStart(2, 0);
  const min =
    data && `${new Date(data.date * 1000).getMinutes()}`.padStart(2, 0);
  // console.log("hour", hour, "min", min);

  const sunriseHour =
    data && `${new Date(data.sunrise * 1000).getHours()}`.padStart(2, 0);
  const sunriseMin =
    data && `${new Date(data.sunrise * 1000).getMinutes()}`.padStart(2, 0);
  // console.log("sunriseHour", sunriseHour, "sunriseMin", sunriseMin);

  const sunsetHour =
    data.sunset && `${new Date(data.sunset * 1000).getHours()}`.padStart(2, 0);
  const sunsetMin =
    data.sunset &&
    `${new Date(data.sunset * 1000).getMinutes()}`.padStart(2, 0);

  const dayOfTheWeek =
    data.date &&
    new Date(data.date * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });

  const date =
    data.date && `${new Date(data.date * 1000).getDate()}`.padStart(2, 0);
  // console.log(date);

  const now = new Date();
  const d = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const dates = new Date(data.date * 1000).toLocaleDateString();
  const todaysDate = `${month}/${d}/${year}`;

  // console.log(dates, todaysDate);

  useEffect = (() => {}, []);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function expandView(e) {
    if (e.currentTarget.id === data.id.toString()) {
      if (data.expand === "view") {
        data.expand = "hidden";
        setIsExpanding(false);
      } else {
        data.expand = "view";
        setIsExpanding(true);
      }
    }
  }

  const display = () => {
    if (data.expand === "view") {
      return (
        <div className={classes.wrapper}>
          As of {hour}:{min} am EDT.
          <button className={classes.btn} onClick={expandView} id={data.id}>
            {props.data.expand === "view" ? <AiOutlineUp /> : <AiOutlineDown />}
          </button>
          <div className={classes.date}>
            {dayOfTheWeek}
            <span> {date} | Day</span>
          </div>
          <div className={classes.innerWrapper}>
            <div className={classes.temp}>
              {props.data.tempMax && Math.round(props.data.tempMax)}&#176;
            </div>

            {props.data.icon && (
              <img
                className={classes.img}
                src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
              />
            )}

            <div className={classes.rain}>
              <span className={classes.rainIcon}>
                {" "}
                <WiHail />
              </span>{" "}
              {data.rain ? data.rain : "N/A"}%
            </div>
            <div className={classes.wind}>
              {" "}
              <span className={classes.windIcon}>
                {" "}
                <WiStrongWind />
              </span>{" "}
              {data.wind_speed} km/h
            </div>
          </div>
          <div className={classes.description}>
            {data.description &&
              capitalizeFirstLetter(data.description.join(""))}
            . Low {data.tempMin && data.tempMin}
            {<span>&#176;</span>}
          </div>
          <div className={classes[`${props.data.expand}`]}>
            <div className={classes.descriptionBox}>
              <div className={classes.humidityUVBox}>
                <div className={classes.humidity}>
                  <span className={classes.weatherIcon}>
                    <WiHumidity />
                  </span>
                  Humidity{" "}
                  <span className={classes.humidityData}>
                    <span className={classes.bold}>{data.humidity}%</span>
                  </span>
                </div>
                <div className={classes.uv}>
                  <span className={classes.weatherIcon}>
                    <WiDaySunny />
                  </span>
                  UV Index{" "}
                  <span className={classes.bold}>
                    {Math.round(props.data.UV)} of 10
                  </span>
                </div>
              </div>
              <hr></hr>

              <div className={classes.sunriseSunsetBox}>
                <div className={classes.sunrise}>
                  <span className={classes.weatherIcon}>
                    {" "}
                    <WiSunrise />
                  </span>{" "}
                  Sunrise{" "}
                  <span className={classes.bold}>
                    {sunriseHour}:{sunriseMin}
                  </span>
                </div>

                <div className={classes.sunset}>
                  <span className={classes.weatherIcon}>
                    {" "}
                    <WiSunset />
                  </span>{" "}
                  Sunset
                  <span className={classes.bold}>
                    {" "}
                    {sunsetHour}:{sunsetMin}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>{!props.data && <p>No data found</p>}</div>
        </div>
      );
    } else {
      return (
        <div className={classes.collapsibleWrapper}>
          <button
            className={classes.collapsibleBtn}
            onClick={expandView}
            id={data.id}
          >
            {props.data.expand === "view" ? <AiOutlineUp /> : <AiOutlineDown />}
          </button>
          <div className={classes.collapsibleDate}>
            {dayOfTheWeek}

            <span className={classes.collapsibleData}> {date}</span>
          </div>
          <div className={classes.collapsibleTemp}>
            <span className={classes.collapsibleTempToday}>
              {props.data.tempMax && Math.round(props.data.tempMax)}
            </span>
            &#176; | {data.tempMin && Math.round(data.tempMin)}&#176;
          </div>

          <div className={classes.collapsibleDescriptionBox}>
            {props.data.icon && (
              <img
                className={classes.collapsibleImg}
                width="50"
                src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
              />
            )}
            <div className={classes.collapsibleDescription}>
              {data.description &&
                capitalizeFirstLetter(data.description.join(""))}
              . Low {data.tempMin && Math.round(data.tempMin)}
              {<span>&#176;</span>}
            </div>
          </div>

          <div className={classes.collapsibleRainWindData}>
            <span className={classes.collapsibleRainIcon}>
              {" "}
              <WiHail />
            </span>
            <div className={classes.collapsibleRainData}>
              {data.rain ? Math.round(data.rain) : "N/A"}%
            </div>
            <span className={classes.collapsibleWindIcon}>
              {" "}
              <WiStrongWind />
            </span>{" "}
            {Math.round(data.wind_speed)} km/h
          </div>
        </div>
      );
    }
  };

  return <Fragment>{display()}</Fragment>;
};

export default Conditions;
