import React from "react";
import styled from "styled-components/macro";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import LeftNav from "../Components/LeftNav/LeftNav";

const Container = styled.div`
  width: 100vw;
  height: 5000px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-bottom: 322px;
`;

export default function Login() {
  return (
    <>
      <Header />
      <Container>
        <LeftNav />
        흑흑..
      </Container>
      <Footer />
    </>
  );
}
