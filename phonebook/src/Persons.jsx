import React from "react";

const Persons = ({ showAll, persons, filteredName, deletePerson }) => {
  return (
    <div>
      {showAll
        ? persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}{" "}
              {
                <button value={person.name} onClick={deletePerson}>
                  delete
                </button>
              }
            </p>
          ))
        : persons
            .filter((person) =>
              person.name.toLowerCase().includes(filteredName.toLowerCase())
            )
            .map((person) => (
              <p key={person.id}>
                {person.name} {person.number}{" "}
                {<button onClick={deletePerson}>delete</button>}
              </p>
            ))}
    </div>
  );
};

export default Persons;
