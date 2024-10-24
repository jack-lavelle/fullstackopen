import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import personsService from "./services/people";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const PersonAddedNotification = ({ newPersonName }) => {
    if (newPersonName === null) {
        return null;
    }

    return (
        <div className="personAddedNotification">{`User with name ${newPersonName} has been successfully added or modified.`}</div>
    );
};

const GetPersonErrorNotification = ({ name }) => {
    if (name === null) {
        return null;
    }

    return (
        <div className="getPersonError">{`Failed to load the information for ${name}, it seems to have already been removed.`}</div>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [searchName, setSearchName] = useState("");
    const [newlyAddedName, setNewlyAddedName] = useState(null);
    const [getPersonErrorName, setPersonErrorName] = useState(null);

    useEffect(() => {
        personsService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);

    const handleSearchNameChange = (event) => {
        setSearchName(event.target.value);
    };

    const handleNewNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNewPhoneNumberChange = (event) => {
        setNewPhoneNumber(event.target.value);
    };

    const deletePerson = (id) => {
        const person = persons.find((person) => person.id === id);
        if (!window.confirm(`Delete ${person.name}?`)) {
            return;
        }

        personsService.deletePerson(id).then(() => {
            const index = persons.indexOf(person);
            const newPersons = persons.slice();
            if (index > -1) {
                newPersons.splice(index, 1);
            }
            setPersons(newPersons);
        });
    };

    const addPerson = (event) => {
        const person = persons.find((person) => person.name === newName);
        event.preventDefault();

        if (person === undefined) {
            const personObject = {
                name: newName,
                number: newPhoneNumber,
            };

            personsService.create(personObject).then((returnedPerson) => {
                persons.concat(returnedPerson);
                setNewlyAddedName(returnedPerson.name);
                setTimeout(() => {
                    setNewlyAddedName(null);
                }, 5000);
            });
        } else {
            if (
                window.confirm(
                    `${person.name} is already added to the phonebook, replace the old number with the new one?`
                )
            ) {
                const updatedPerson = {
                    ...person,
                    number: newPhoneNumber,
                };
                personsService
                    .update(person.id, updatedPerson)
                    .then((returnedPerson) => {
                        const index = persons.indexOf(returnedPerson);
                        const newPersons = persons.slice();
                        if (index > -1) {
                            newPersons[index].number = newPhoneNumber;
                        }
                        setTimeout(() => {
                            setNewlyAddedName(null);
                        }, 5000);
                    })
                    .catch((error) => {
                        setPersonErrorName(person.name);
                        setTimeout(() => {
                            setPersonErrorName(null);
                        }, 5000);
                    });
            }
        }
        setNewName("");
        setNewPhoneNumber("");
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <PersonAddedNotification newPersonName={newlyAddedName} />
            <GetPersonErrorNotification name={getPersonErrorName} />
            <Filter
                searchName={searchName}
                handleSearchNameChange={handleSearchNameChange}
            />
            <h2>Add a new Person</h2>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNewNameChange={handleNewNameChange}
                newPhoneNumber={newPhoneNumber}
                handleNewPhoneNumberChange={handleNewPhoneNumberChange}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                searchName={searchName}
                deletePerson={deletePerson}
            />
        </div>
    );
};

export default App;
