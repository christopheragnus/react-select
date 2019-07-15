import React from "react";
import { create } from "react-test-renderer";
import AutoComplete from "../components/Autocomplete";

describe("Select component", () => {
  test("Matches the snapshot", () => {
    const Snapshot = create(<AutoComplete />);
    expect(Snapshot.toJSON()).toMatchSnapshot();
  });
});
