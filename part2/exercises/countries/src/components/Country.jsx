const Country = ({ countryData }) => {
    const languages = Object.values(countryData.languages);
    return (
        <div>
            <h1>{countryData.name.common}</h1>
            <div>{`Capital: ${countryData.capital[0]}`}</div>
            <div>{`Area: ${countryData.area} km^2`}</div>
            <h2>Languages</h2>
            <ul>
                {languages.map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={countryData.flags["png"]} />
        </div>
    );
};

export default Country;
