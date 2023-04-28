import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filteredName, setFilteredName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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

    axios
      .post("http://localhost:3001/persons", personObject)
      .then((respone) => {
        console.log(respone.data);
        setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
      });
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
