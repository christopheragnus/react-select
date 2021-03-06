import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import AsyncSelect from "react-select/async";
import axios from "axios";
import Highlighter from "react-highlight-words";
import styled from "styled-components";
import "./autocomplete.css";

const API_URL = "http://www.omdbapi.com";
const API_KEY = process.env.REACT_APP_API_KEY;

const customStyles = {
  control: styles => ({ ...styles, borderRadius: "40px" }),
  container: styles => ({ ...styles, width: "90%" }),
  valueContainer: styles => ({ ...styles, padding: "2px" }),
  option: (styles, state) => ({
    ...styles
  }),
  multiValue: (styles, { data }) => ({
    ...styles,
    borderRadius: "20px",
    padding: "4px"
  })
};

function Autocomplete() {
  const [selectedOption, setSelectedOption] = useState([]);
  const [message, setMessage] = useState(null);
  let inputValue;

  useEffect(() => {});

  function noOptionsMessage(inputMessage) {
    if (!inputMessage) {
      return "No results found.";
    }
  }

  const searchOptions = async value => {
    try {
      setMessage(null);
      const res = await axios.get(API_URL, {
        params: {
          apikey: API_KEY,
          s: value
        }
      });
      if (res.data.Response === "True") {
        const searchData = res.data.Search;
        return searchData.map(item => {
          let tempArr = {};
          tempArr["value"] = item.imdbID;
          tempArr["label"] = item.Title;
          tempArr["year"] = item.Year;
          return tempArr;
        });
      }
    } catch (err) {
      //console.log(err);
      setMessage(err);
    }
  };

  const customOption = (props, state) => {
    const { label, year } = props.data;
    return (
      <CustomDropdown>
        <components.Option {...props}>
          <Highlighter
            highlightClassName="highlightClass"
            searchWords={[inputValue]}
            textToHighlight={label}
          >
            <Title>{label}</Title>
          </Highlighter>
          <Subtitle>{year}</Subtitle>
        </components.Option>
      </CustomDropdown>
    );
  };

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    //console.log(`Option selected:`, selectedOption);
  };

  const onInputChange = value => {
    inputValue = value;
  };

  return (
    <>
      {message ? <ErrorPost>{String(message)}</ErrorPost> : null}
      <AsyncSelect
        cacheOptions
        defaultOptions
        isMulti
        isSearchable
        loadOptions={searchOptions}
        styles={customStyles}
        components={{ Option: customOption }}
        noOptionsMessage={() => noOptionsMessage()}
        onInputChange={onInputChange}
        onChange={handleChange}
        isOptionDisabled={
          selectedOption
            ? option => (selectedOption.length >= 5 ? true : false)
            : false
        }
      />
    </>
  );
}

const ErrorPost = styled.div`
  margin: 5px;
  background-color: #fff1f0;
  border: 1px solid #ffa39e;
  box-sizing: border-box;
  margin: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  padding: 8px 15px 8px 15px;
  border-radius: 4px;
`;

const CustomDropdown = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 1rem;
`;

const Subtitle = styled.div`
  font-size: 0.8rem;
  color: grey;
`;

export default Autocomplete;
