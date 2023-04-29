import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [searchedCountry, setSearchedCountry] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  const searchCountries = (event) => {
    setSearchedCountry(event.target.value);

    console.log("dsdas", searchedCountry);

    if (searchedCountry.length === 1) {
      setFilteredCountries(null);
    } else {
      console.log("aaaaaa");
      setFilteredCountries(
        countries.filter((country) => {
          return (
            country.name.common
              .toLowerCase()
              .search(searchedCountry.toLowerCase()) !== -1
          );
        })
      );
    }
  };

  const btnPressed = (event) => {
    setFilteredCountries(
      countries.filter((country) => {
        return (
          country.name.common
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
        );
      })
    );

    setIsPressed(!isPressed);
  };

  return (
    <div>
      <div>
        Find Countries
        <input value={searchedCountry} onChange={searchCountries}></input>
      </div>
      <div>
        {filteredCountries &&
          filteredCountries.length !== 1 &&
          filteredCountries.length < 10 &&
          filteredCountries.map((countries) => (
            <div>
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
          filteredCountries.map((countries) => (
            <div>
              <h1>{countries.name.common}</h1>
              <p>Capital:{countries.capital}</p>
              <p>Area:{countries.area}</p>
              <h2>Languages</h2>
              {countries.languages &&
                Object.entries(countries.languages).map(([key, value]) => (
                  <div>
                    <p>{value}</p>
                    {console.log("sss", value)}
                  </div>
                ))}
              <img src={countries.flags.png} alt="Flag" />
            </div>
          ))}
        {filteredCountries && filteredCountries.length > 10 && (
          <div>Too many matches,specify another filter</div>
        )}
      </div>
    </div>
  );
};

export default App;
