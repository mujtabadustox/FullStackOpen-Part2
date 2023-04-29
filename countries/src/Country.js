import React from "react";
import Weather from "./Weather";

const Country = ({ filteredCountries, btnPressed, isPressed }) => {
  return (
    <div>
      {filteredCountries &&
        filteredCountries.length !== 1 &&
        filteredCountries.length < 10 &&
        filteredCountries.map((countries, index) => (
          <div key={index}>
            <p>
              {countries.name.common}{" "}
              <button
                type="btn"
                value={countries.name.common}
                onClick={btnPressed}
              >
                show
              </button>
            </p>
          </div>
        ))}
      {filteredCountries &&
        (filteredCountries.length === 1 || isPressed) &&
        filteredCountries.map((countries, index) => (
          <div key={index}>
            <h1>{countries.name.common}</h1>
            <p>Capital:{countries.capital}</p>
            <p>Area:{countries.area}</p>
            <h2>Languages</h2>
            {countries.languages &&
              Object.entries(countries.languages).map(([key, value]) => (
                <div>
                  <p key={key}>{value}</p>
                  {console.log("sss", value)}
                </div>
              ))}
            <img src={countries.flags.png} alt="Flag" />
            <Weather capital={countries.capital} />
          </div>
        ))}
      {filteredCountries && filteredCountries.length > 10 && (
        <div>Too many matches,specify another filter</div>
      )}
    </div>
  );
};

export default Country;
