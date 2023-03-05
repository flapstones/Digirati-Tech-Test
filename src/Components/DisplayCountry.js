import '../App.css';
import React from 'react';
import 'react-dropdown/style.css';

const DisplayCountry = ({countryInfo}) => {
	const getNativeNames = Object.values(Object.values(countryInfo.name.nativeName)[0]);

	return (
		<section className="info-section">
			<h2>{`${countryInfo.name.common} - ${countryInfo.flag}`}</h2>
			<div className="info-container">
				<div className="info-flag">
					<img alt={countryInfo.flags.alt} src={countryInfo.flags.png} />
				</div>
				<div className="main-info-list">
					<p className={'info-row'}><b>Official name:</b> {countryInfo.name.official}</p>
					<p className={'info-row'}><b>Native name{(getNativeNames.length > 1 ? 's' :'')}:</b> {getNativeNames.join(', ')}</p>
					{countryInfo.translations.jpn && <p className={'info-row'}><b>Japanese name:</b> {countryInfo.translations.jpn.official}</p>}
					<p className={'info-row'}><b>Population density:</b> {Math.round(countryInfo.population / countryInfo.area)}</p>
				</div>
			</div>
		</section>
	);
}

export default DisplayCountry;
