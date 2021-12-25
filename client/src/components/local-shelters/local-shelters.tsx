import './local-shelters.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DropdownMenu from '../core/dropdown-menu/dropdown-menu';

const LocalShelters = (): JSX.Element => {
  const Shelters: any[] = useSelector((state: any) => state.shelters.shelters);
  let countriesList: any[] = [];
  Shelters.forEach((shelter) => {
    if (!countriesList.some((country) => country === shelter.country)) {
      countriesList.push(shelter.country);
    }
  });
  function listWithRegions(country: string) {
    let countryShelters = Shelters.filter(
      (shelter) => shelter.country === country
    );
    let regionsList: any[] = [];
    countryShelters.forEach(
      (shelter) =>
        !regionsList.includes(shelter.region) &&
        regionsList.push(shelter.region)
    );
    return regionsList;
  }
  function listBuilder(country: string) {
    let regionList = listWithRegions(country);
    let sheltersInRegion: { region: string; shelters: any[] }[] = [];
    regionList.forEach((region) =>
      sheltersInRegion.push({
        region: region,
        shelters: Shelters.filter((shelter) => shelter.region === region),
      })
    );
    return sheltersInRegion;
  }
  const [country, setCountry] = useState('Spain');
  return (
    <div className="shelters-page">
      <div>
        <header className="shelters-search">
          <DropdownMenu
            title="Country"
            itemList={countriesList}
            filterFunc={setCountry}
          />
        </header>
        <div className="shelters-body">
          {listBuilder(country).map((region) => (
            <div className="region-container" key={region.region}>
              <h2 className="region-name">{region.region}:</h2>
              <ul className="region__shelter-list">
                {region.shelters.map((shelter) => (
                  <li className="shelter-container" key={shelter.name}>
                    <a className="shelter-link" href={shelter.link}>
                      {shelter.name}
                    </a>
                    <span className="shelter-number">{shelter.pnumber}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <footer className="shelter-form__container">
        <h2 className="shelter-form__title">Isn't your shelter here?</h2>
        <h3 className="shelter-form__subtitle">
          Send us your info so we can add it to the list
        </h3>
        <form autoComplete="off" className="shelter-form">
          <div className="shelter-input__container">
            <label htmlFor="Email">Email</label>
            <input
              className="shelter-form__input"
              name="Email"
              type="text"
              placeholder="doggo@paw.can"
            />
          </div>
          <div className="shelter-input__container">
            <label htmlFor="Phone">Phone number with country code</label>
            <input
              className="shelter-form__input"
              name="Phone"
              type="text"
              placeholder="+34654654654"
            />
          </div>
          <div className="shelter-input__container">
            <label htmlFor="Website">Website</label>
            <input
              className="shelter-form__input"
              name="Website"
              type="text"
              placeholder="https://salvandopeludos.org/"
            />
          </div>
          <button className="shelter-form__submit" type="submit">
            Send
          </button>
        </form>
        <p className="shelter-form__message">
          We will check your website and contact you personally
        </p>
      </footer>
    </div>
  );
};
export default LocalShelters;
