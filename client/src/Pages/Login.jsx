/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components/macro";
import Header from "../Components/Header/Header";
import BREAKPOINT from "../breakpoint";
import Logo from "../icons/LogoGlyphMd.svg";
import AlertCircle from "../icons/AlertCircle.svg";

import { useNavigate } from "react-router-dom";

const Background = styled.div`
  background-color: #f6f6f6;
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto auto;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: 400px;
    align-items: center;
    height: max-content;
  }
`;

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #e4e4e4;
  width: 320px;
  height: max-content;
  background-color: white;
  box-shadow: 0 0 5px 5px #e4e4e4;
  padding: 30px 0 30px 0;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    margin-left: 0;
  }
`;

const LoginInputContainer = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const LoginInputInnerContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`

const LoginLabel = styled.label`
  font-weight: 600;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #bababa;
  border-radius: 4px;
`;

const Validation = styled.p`
  width: 80%;
  font-size: small;
  margin-top: 5px;
  color: #DE4F54;
`;

const LoginButton = styled.button`
  margin-top: 20px;
  width: 80%;
  height: 35px;
  background-color: #0a95ff;
  color: white;
  border: 1px solid #0a95ff;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 0 #6fc0ff;

  &:hover {
    cursor: pointer;
  }
`;

const Linker = styled.a`
  color: #0a95ff;

  &:hover {
    cursor: pointer;
  }
`;

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Background>
        <Container>
          <img src={Logo} css={`margin-bottom: 30px; `}/>
          <LoginFormContainer>
            <LoginForm>
              <LoginInputContainer>
                <LoginLabel>Email</LoginLabel>
                <LoginInputInnerContainer>
                  <LoginInput />
                </LoginInputInnerContainer>
              </LoginInputContainer>
              <LoginInputContainer>
                <LoginLabel>Password</LoginLabel>
                <LoginInputInnerContainer>
                  <img src={AlertCircle} css={`position: absolute; right: 0; margin-right: 10px;`}/>
                  <LoginInput css={`border: 1px solid rgb(222, 79, 84);`}/>
                </LoginInputInnerContainer>
              </LoginInputContainer>
              <Validation>Password cannot be empty.</Validation>
              <LoginButton>Log in</LoginButton>
            </LoginForm>
            <p css={`font-size: small; margin-top: 30px;`}> Don’t have an account? <Linker onClick={() => {navigate('/signup')}}>Sign up</Linker></p>
          </LoginFormContainer>
        </Container>
      </Background>
    </>
  );
};

export default Login;
