import React from "react";

const Persons = ({ showAll, persons, filteredName }) => {
  return (
    <div>
      {showAll
        ? persons.map((person) => (
            <p>
              {person.name} {person.number}
            </p>
          ))
        : persons
            .filter((person) =>
              person.name.toLowerCase().includes(filteredName.toLowerCase())
            )
            .map((person) => (
              <p>
                {person.name} {person.number}
              </p>
            ))}
    </div>
  );
};

export default Persons;
