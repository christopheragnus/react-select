import React, { useState } from "react";
import Select, { components } from "react-select";
import AsyncSelect from "react-select/async";
import axios from "axios";
import Highlighter from "react-highlight-words";
import styled from "styled-components";
import "./autocomplete.css";

const API_URL = "http://www.omdbapi.com";
const API_KEY = process.env.REACT_APP_API_KEY;

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

const customStyles = {
  control: styles => ({ ...styles, borderRadius: "40px" }),
  container: styles => ({ ...styles, width: "90%" }),
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
  const [inputValue, setInputValue] = useState(null);

  function noOptionsMessage(inputMessage) {
    if (!inputMessage) {
      return "No results found.";
    }
  }

  const searchOptions = value => {
    return axios
      .get(API_URL, {
        params: {
          apikey: API_KEY,
          s: value
        }
      })
      .then(res => {
        //console.log(res.data.Search);

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
      })
      .catch(err => {
        console.log(err);
        noOptionsMessage(err);
      });
  };

  const customOption = props => {
    const { label, year } = props.data;
    console.log("inside props", props);

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

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      isMulti
      className="basic-multi-select"
      classNamePrefix="select"
      loadOptions={searchOptions}
      styles={customStyles}
      components={{ Option: customOption }}
      noOptionsMessage={() => noOptionsMessage()}
    />
  );
}

export default Autocomplete;
