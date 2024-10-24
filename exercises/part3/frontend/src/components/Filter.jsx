const Filter = ({ searchName, handleSearchNameChange }) => {
    return (
        <div>
            Filter out names that do not contain:{" "}
            <input value={searchName} onChange={handleSearchNameChange} />
        </div>
    );
};

export default Filter;
