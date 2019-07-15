import React from "react";
import Autocomplete from "./components/Autocomplete";
import styled from "styled-components";

const Container = styled.div`
  padding: 3rem;

  display: grid;
  place-items: start center;
`;

function App() {
  return (
    <Container>
      <Autocomplete />
    </Container>
  );
}

export default App;
