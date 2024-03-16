const Persons = ({ persons, searchName }) => {
    const contains = (string, substring) =>
        string.toLowerCase().includes(substring.toLowerCase());

    const peopleToShow = persons.filter((person) =>
        contains(person.name, searchName)
    );

    return (
        <div>
            {peopleToShow.map((person) => (
                <div key={person.id}>
                    {person.name} {person.phoneNumber}
                </div>
            ))}
        </div>
    );
};

export default Persons;
