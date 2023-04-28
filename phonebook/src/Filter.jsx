import React from "react";

const Filter = ({ filteredName, handleFilteredName, toggleSearch }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={filteredName} onChange={handleFilteredName} />
      <button onClick={toggleSearch}>toggle search</button>
    </div>
  );
};

export default Filter;
