import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", phoneNumber: "(555) 555-5555", id: 1 },
        { name: "Ada Lovelace", phoneNumber: "(123) 456-7890", id: 2 },
        { name: "Dan Abramov", phoneNumber: "(800) 555-1212", id: 3 },
        { name: "Mary Poppendieck", phoneNumber: "(212) 555-1234", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("000-000-0000");
    const [searchName, setSearchName] = useState("");

    const handleSearchNameChange = (event) => {
        setSearchName(event.target.value);
    };

    const containsNewName = () => {
        return persons.find((person) => person.name === newName) !== undefined;
    };

    const handleNewNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNewPhoneNumberChange = (event) => {
        setNewPhoneNumber(event.target.value);
    };

    const addPerson = (event) => {
        event.preventDefault();
        if (containsNewName()) {
            alert(`${newName} is already added in the phonebook.`);
            setNewName("");
            return;
        }

        const PersonObject = {
            id: persons.length + 1,
            name: newName,
            phoneNumber: newPhoneNumber,
        };

        setPersons(persons.concat(PersonObject));
        setNewName("");
        setNewPhoneNumber("000-000-0000");
    };

    return (
        <div>
            <h2>Phonebook</h2>
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
            <Persons persons={persons} searchName={searchName} />
        </div>
    );
};

export default App;
