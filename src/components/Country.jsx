import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import './country.css'

const Country = () => {
  
  const [country, setCountry] = useState([]);
  const { name } = useParams();
  const [capital, setCapital] = useState("")
  const [weather, setWeather] = useState([]);
  
  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(
        `https://restcountries.eu/rest/v2/name/${name}`
        )
        const country = await response.json()
        setCountry(country)
        // console.log(country[0].capital);
        setCapital(country[0].capital);
      }
      
      fetchCountryData();
    }, [name])

    useEffect(() => {
      const fetchWeather = async() => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const weather = await response.json();
        setWeather(weather);
        // console.log(weather);
        // console.log(capital);
        // setClouds(weather.clouds.all)
        // const clouds =await weather.clouds.all;
      }
      fetchWeather();
    }, [capital])
  return (
    <>
      <section className="country">
        <Link to="/" className="btn btn-light">
          <i className="fas fa-arrow-left"></i> Back Home
        </Link>
        {country.map((c) => {
          const {
            numericCode,
            flag,
            name,
            nativeName,
            population,
            region,
            subregion,
            capital,
            topLevelDomain,
            currencies,
            languages,
            borders,
          } = c

          const{clouds} =weather ;
          // const {all} = clouds;
          // console.log(all);
          // console.log(weather);

          return (
            <article key={numericCode}>
              <div className="country-inner">
                <div className="flag">
                  <img src={flag} alt={name} />
                </div>

                <div className="country-details">
                  <div>
                    <h2>{name}</h2>
                    <h5>
                      Native Name: <span>{nativeName}</span>
                    </h5>
                    <h5>
                      Population: <span>{population}</span>
                    </h5>
                    <h5>
                      Region: <span>{region}</span>
                    </h5>
                    <h5>
                      Sub Region: <span>{subregion}</span>
                    </h5>
                    <h5>
                      Capital: <span>{capital}</span>{' '}
                    </h5>
                  </div>
                  
              {typeof clouds !== "undefined" && 
              typeof weather !== "undefined" && 
                <div>
                  <h1>Weather information:</h1>
                  <h5>Clouds Percent: <span>{weather.clouds.all}</span></h5>
                  <h5>Weather: <span>{weather.weather[0].main}</span></h5>
                  <h5>Wind Speed: <span>{weather.wind.speed}</span></h5>
                  {/* <h5><span>{weather.weather[0].icon}</span></h5> */}

                </div>
              }
                </div>
              </div>
              <div>
                <h3>Border Countries: </h3>
                <div className="borders">
                  {borders.map((border) => {
                    return (
                      <ul key={border}>
                        <li>{border}</li>
                      </ul>
                    )
                  })}
                </div>
              </div>
            </article>
          )
        })}

      </section>
    </>
  )
}

export default Country