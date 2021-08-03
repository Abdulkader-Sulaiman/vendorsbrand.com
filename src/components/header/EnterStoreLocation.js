import {useState} from'react';
import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../../languageSelect";



import "../../css/EnterStoreLocation.css";
export default function Select() {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const { t } = useTranslation();


  return (
    <div className="Select" >
      {/* <ReactLanguageSelect
      names={"international"}
      onSelect={(languageCode)=>setSelectedLanguage(languageCode)}
      /> */}
      
    
    
        <CountryDropdown
        value={country}   
        onChange={(val) => setCountry(val)}
        className="Country"
      /> 
     



      <RegionDropdown
        country={country}
        value={region}
        onChange={(val) => setRegion(val)}
        className="Region"
    
      />
       <div>{country}</div>
      <div>{region}</div> 
    </div>
  );
}
