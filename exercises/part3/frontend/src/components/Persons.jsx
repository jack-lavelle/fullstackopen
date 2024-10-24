const Persons = ({ persons, searchName, deletePerson }) => {
    const contains = (string, substring) =>
        string.toLowerCase().includes(substring.toLowerCase());

    const peopleToShow = persons.filter((person) =>
        contains(person.name, searchName)
    );

    const DeleteButton = ({ deletePerson, id }) => {
        return <button onClick={() => deletePerson(id)}>delete</button>;
    };

    return (
        <div>
            {peopleToShow.map((person) => (
                <div key={person.id}>
                    {person.name} {person.number}{" "}
                    <DeleteButton deletePerson={deletePerson} id={person.id} />
                </div>
            ))}
        </div>
    );
};

export default Persons;
