import React, { Component, Fragment } from "react";
import Select from "react-select";
import { colourOptions } from "./data";

import AsyncSelect from "react-select/async";
import axios from "axios";

function Autocomplete() {
  return (
    <Select
      defaultValue={[colourOptions[2], colourOptions[3]]}
      isMulti
      name="colors"
      options={colourOptions}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}

export default Autocomplete;
