import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Country from "./components/Country";

function App() {
    const [countries, setCountries] = useState([]);
    const [searchString, setSearchString] = useState("");

    const userResponseMessage =
        searchString === ""
            ? "Please enter a country to search for."
            : "There are too many countries matching this suggestion, please be more specific.";

    const handleSearchStringChange = (event) => {
        console.log(event.target.value);
        setSearchString(event.target.value);
    };

    const countriesToShow =
        searchString === ""
            ? countries
            : countries.filter((countryData) =>
                  countryData.name.common
                      .toLowerCase()
                      .includes(searchString.toLowerCase())
              );

    useEffect(() => {
        countryService.getAllCountries().then((countries) => {
            setCountries(countries);
        });
    });

    if (countriesToShow.length > 11) {
        return (
            <div>
                <div>
                    Search for countries:{" "}
                    <input
                        value={searchString}
                        onChange={handleSearchStringChange}
                    />
                </div>
                <div>{userResponseMessage}</div>
            </div>
        );
    } else if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
        return (
            <div>
                <div>
                    Search for countries:{" "}
                    <input
                        value={searchString}
                        onChange={handleSearchStringChange}
                    />
                </div>
                <ul>
                    {countriesToShow.map((countryData) => (
                        <div key={countryData.name.common}>
                            {countryData.name.common}
                        </div>
                    ))}
                </ul>
            </div>
        );
    } else if (countriesToShow.length === 1) {
        return (
            <div>
                <div>
                    Search for countries:{" "}
                    <input
                        value={searchString}
                        onChange={handleSearchStringChange}
                    />
                </div>
                <Country countryData={countriesToShow[0]} />
            </div>
        );
    } else {
        return (
            <div>
                <div>
                    Search for countries:{" "}
                    <input
                        value={searchString}
                        onChange={handleSearchStringChange}
                    />
                </div>
                <div>No countries match the current search.</div>
            </div>
        );
    }
}

export default App;
