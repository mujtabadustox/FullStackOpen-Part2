import React from "react";

const Filter = ({ searchedCountry, searchCountries }) => {
  return (
    <div>
      <input value={searchedCountry} onChange={searchCountries}></input>
    </div>
  );
};

export default Filter;
