import './App.css';
import React, {useEffect, useState} from 'react';
import DropDown from 'react-a11y-dropdown'
import axios from 'axios';
import 'react-dropdown/style.css';
import DisplayCountry from "./Components/DisplayCountry";
import { SpinnerCircular } from 'spinners-react';

const App = () => {
    const [continents, setContinents] = useState([]);
    const [countries, setCountries] = useState([]);
    const [countryInfo, setCountryInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [chosenRegion, setChosenRegion] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios
			.get('https://restcountries.com/v3.1/all')
			.then((response) => {
				const getContinentNames = Array.from(new Set(response.data.map((area) => area.continents[0])));

				setContinents(getContinentNames);
        	}).catch(function(error) {
                if (error.message) {
                    setError(error.message);
                }
            });
    }, []);

    const chooseRegion = (e) => {
        e.preventDefault();
        setChosenRegion(e.target.dataset.value);

        axios
            .get('https://restcountries.com/v3.1/region/'+ e.target.dataset.value)
            .then((response) => {
                const getCountryNames = response.data.map(country => (country.name.common));
                setCountries(getCountryNames);
            }).catch(function(error) {
                if (error.message) {
                    setError(error.message);
                }
            });
    }

    const chooseCountry = (e) => {
        e.preventDefault();
        setIsLoading(true);
            axios
                .get('https://restcountries.com/v3.1/name/'+ e.target.dataset.value)
                .then((response) => {
                    setCountryInfo(response.data[0]);
                    setIsLoading(false);
                }).catch(function(error) {
                    if (error.message) {
                        setError(error.message);
                    }
                });
    }

    return (
        <div className="main-section">
            <h1>David Johnson - Digirati Test</h1>
            <div className="dropdown-container">
                {error && <p>There has been a problem. Please try again.</p>}
                <DropDown
                    label="Choose a Region of the World"
                    id="region-dropdown"
                    className="region-dropdown dropdown"
                    search={true}
                >
                    {continents.length ?
                        <ul>
                            {continents.map((continent, i) => (
                                <li key={i}><a href="#" data-value={continent} onClick={chooseRegion}>{continent}</a></li>
                            ))}
                        </ul>
                        : <div className="spinner">
                            <SpinnerCircular size={50} thickness={100} speed={100} color="rgba(57, 172, 148, 1)" secondaryColor="rgba(0, 0, 0, 0.2)" />
                        </div>}
                </DropDown>

                {chosenRegion &&
                    <DropDown
                        label="Choose a Country"
                        id="country-dropdown"
                        className="country-dropdown dropdown"
                        search={true}
                    >
                        {countries.length ? <ul>
                            {countries.map((country, i) => (
                                <li key={i}><a href="#" data-value={country} onClick={chooseCountry}>{country}</a></li>
                            ))}
                        </ul> : <div className="spinner">
                            <SpinnerCircular size={50} thickness={100} speed={100} color="rgba(57, 172, 148, 1)" secondaryColor="rgba(0, 0, 0, 0.2)" />
                        </div>}
                    </DropDown>
                }
            </div>
            {countryInfo ? <DisplayCountry countryInfo={countryInfo} /> : (isLoading ? <div className="spinner spinner-main">
                <SpinnerCircular size={200} thickness={100} speed={100} color="rgba(57, 172, 148, 1)" secondaryColor="rgba(0, 0, 0, 0.2)" />
            </div> : '')}
        </div>
    );
}

export default App;
