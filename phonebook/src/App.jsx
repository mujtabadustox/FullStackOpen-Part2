import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "./services/person";
import person from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filteredName, setFilteredName] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newArr = persons.map((person) => person.name.toLowerCase());

    console.log("first", newArr);

    if (newArr.includes(newName.toLowerCase())) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const idFound = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const id = idFound ? idFound.id : null;
        const updatedObject = { ...idFound, number: newNumber };

        personService.update(id, updatedObject).then((response) => {
          console.log(response.data);
          setPersons(
            persons.map((person) => (person.id !== id ? person : response.data)) //if id is the one then put newdata else old
          );
        });
      } else {
        return;
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      personService.create(personObject).then((respone) => {
        console.log(respone.data);
        setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
      });
    }
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

  const deletePerson = (event) => {
    if (window.confirm(`Delete ${event.target.value} ?`)) {
      const idFound = persons.find(
        (person) => person.name === event.target.value
      );
      const id = idFound ? idFound.id : null;
      personService.removeUser(id).then((respone) => {
        console.log(respone.data);
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
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
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
