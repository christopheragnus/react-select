import React, { useState } from "react";
import Select from "react-select";

import AsyncSelect from "react-select/async";
import axios from "axios";

const API_URL = "http://www.omdbapi.com";
const API_KEY = process.env.REACT_APP_API_KEY;

const searchOptions = inputValue => {
  console.log(inputValue);

  if (!inputValue || inputValue === " ") {
    inputValue = "Australia";
  }

  return axios
    .get(API_URL, {
      params: {
        apikey: API_KEY,
        s: inputValue
      }
    })
    .then(res => {
      console.log(res.data.Search);
      const searchData = res.data.Search;

      return searchData.map(item => {
        let tempArr = [];
        tempArr["value"] = item.imdbID;
        tempArr["label"] = item.Title;

        return tempArr;
      });
    })
    .catch(err => {
      console.log(err);
    });
};

const customStyles = {
  control: styles => ({ ...styles, borderRadius: "40px" }),
  option: (provided, state) => ({
    ...provided,
    //borderBottom: "1px dotted pink"
    display: "flex"
  })
};



function Autocomplete() {
  const [inputValue, setInputValue] = useState({ inputValue: "" });

  const handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, "");
    setInputValue({ inputValue });
    return inputValue;
  };

  const Option = ({ label }) => <div>{`tada`}{label}</div>

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      isMulti
      name="colors"
      className="basic-multi-select"
      classNamePrefix="select"
      loadOptions={searchOptions}
      styles={customStyles}
      components={{ Option }}
    />
  );
}

export default Autocomplete;
