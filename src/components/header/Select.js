import {useState} from'react';
import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../../languageSelect";



import "../../css/Select.css";
export default function Select() {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const { t } = useTranslation();

  return (
  
      
    <div className="Select">
      {/* <ReactLanguageSelect
      names={"international"}
      onSelect={(languageCode)=>setSelectedLanguage(languageCode)}
      /> */}
  
      <h3 className="h3Title" style={{textAlign:'center'}}>{t('Choose any Country Market you like')} </h3>
        <CountryDropdown
        value={t(country)}  
        onChange={(val) => setCountry(t(val))}
        className="CountryDropdown"
        id="country"
      /> 
     
{/* 
      <RegionDropdown
        country={t(country)}
        value={region}
        onChange={(val) => setRegion(t(val))}
        className="RegionDropdown"
        id="region"
      /> */}



       {/* <div>{t(country)}</div>
      <div>{region}</div>  */}
    </div>
  );
}
