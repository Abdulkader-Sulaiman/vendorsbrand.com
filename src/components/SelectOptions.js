import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import Select from "react-select";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import '../css/Signup.css';

export const SelectBox = ({ options, name, onChange, selected}) => {
  const [Label, SetLabel] = useState("");
  const [optionSelected, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    onChange({ name, category: selected.value });
    // export default  Label = selected.label;
    SetLabel(selected.label)
   
    setSelectedOptions(selected);
  
  };
 
  console.log("From State", Label)
  

  return (
    <Select
      options={options}
      isLoading={!options}
      closeMenuOnSelect={true}
      onChange={handleChange}
      value={optionSelected}
      name={name}
    />
  );
};

const SelectOptions = () => {
  const [validated, setValidated] = useState(false);
  const { t } = useTranslation();
  const [select, setSelect] = useState({
    // category: ""
  });

  const handleChange = (e) => {
    console.log(e);
  };

  //const [data, setData] = useState([]);
  /* get data */

  const data = [
    { id: 1, Name: "Business account" },
    { id: 2, Name: "Personal account" }
  ];
  //console.log(data);
  const categories = data.map((item) => ({ value: item.id, label: item.Name }));
  //console.log(categories);
  
  return (
    <div className="app">
      <Form noValidate validated={validated}  id="select"> 
          <Form.Label 
          className="label"
          style={{marginBottom:'20px', position:'relative'}}
          >{t("Page Type")}</Form.Label>
    
            <SelectBox
              options={categories}
              name={"select1"}
              onChange={handleChange}
              id="select"
            />
      </Form>
  
    </div>
  );
};

export default SelectOptions;
