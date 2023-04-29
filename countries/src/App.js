import React, { useEffect, useState } from "react";
import axios from "axios";
import Country from "./Country";
import Filter from "./Filter";

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
    setIsPressed(false);

    console.log("dsdas", searchedCountry);
    console.log("ISPRESSED", isPressed);

    if (searchedCountry.length === 1) {
      setFilteredCountries(null);
      setIsPressed(false);
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

  return countries ? (
    <div>
      <div>
        Find Countries
        <Filter
          searchedCountry={searchedCountry}
          searchCountries={searchCountries}
        />
      </div>
      <div>
        <Country
          filteredCountries={filteredCountries}
          btnPressed={btnPressed}
          isPressed={isPressed}
        />
      </div>
    </div>
  ) : (
    <div>Loading Please Wait</div>
  );
};

export default App;
