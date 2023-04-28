import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filteredName, setFilteredName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const newArr = persons.map((person) => person.name.toLowerCase());

    console.log("first", newArr);

    if (newArr.includes(newName.toLowerCase())) {
      return alert(`${newName} is already added to phonebook`);
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNewPerson = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilteredName = (event) => {
    setFilteredName(event.target.value);
    //setShowAll(!showAll);
  };

  const toggleSearch = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter
          filteredName={filteredName}
          handleFilteredName={handleFilteredName}
          toggleSearch={toggleSearch}
        />
      </div>
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewPerson={handleNewPerson}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h3>Numbers</h3>
      <Persons
        showAll={showAll}
        persons={persons}
        filteredName={filteredName}
      />
    </div>
  );
};

export default App;
