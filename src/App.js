import React from "react";
import Autocomplete from "./components/Autocomplete";
import styled from "styled-components";

const Container = styled.div`
  padding: 3rem;
  background-color: #21d4fd;
  background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
  display: grid;
  place-items: start center;
  height: 80vh;
`;

function App() {
  return (
    <Container>
      <Autocomplete />
    </Container>
  );
}

export default App;
