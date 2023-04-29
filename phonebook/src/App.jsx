import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "./services/person";
import person from "./services/person";
import "./index.css";

const Notification = ({ error }) => {
  return <div className={`${error.type}`}>{error.msg}</div>;
};

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filteredName, setFilteredName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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

        personService
          .update(id, updatedObject)
          .then((response) => {
            console.log(response.data);
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : response.data
              ) //if id is the one then put newdata else old
            );
            setErrorMessage({
              msg: `Updated ${updatedObject.name} New Number: ${updatedObject.number}`,
              type: "success",
            });

            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage({
              msg: `Information of ${updatedObject.name} has already been removed from the server`,
              type: "error",
            });

            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
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

      personService
        .create(personObject)
        .then((response) => {
          console.log(response.data);
          setPersons(persons.concat(personObject));
          setErrorMessage({
            msg: `Added ${personObject.name}`,
            type: "success",
          });

          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);

          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log("error");
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
      personService
        .removeUser(id)
        .then((respone) => {
          console.log(respone.data);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <Notification error={errorMessage} />}
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
      {persons && (
        <Persons
          showAll={showAll}
          persons={persons}
          filteredName={filteredName}
          deletePerson={deletePerson}
        />
      )}
    </div>
  );
};

export default App;
