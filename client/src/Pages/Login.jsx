/* eslint-disable jsx-a11y/alt-text */
import { React, useState, useRef } from "react";
import styled from "styled-components/macro";
import Header from "../Components/Header/Header";
import BREAKPOINT from "../breakpoint";
import Logo from "../icons/LogoGlyphMd.svg";
import AlertCircle from "../icons/AlertCircle.svg";
import Google from "../icons/Google.png";
import { useNavigate } from "react-router-dom";
import { useInputStore, useErrorMessageStore, useIsLoginStore, useUserInfoStore } from "../store/loginstore";
import axios from "axios";

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
`;

const LoginLabel = styled.label`
  font-weight: 600;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #bababa;
  border-radius: 4px;

  &.error {
    border: 1px solid rgb(222, 79, 84);
  }
`;

const ErrorMessage = styled.p`
  width: 80%;
  font-size: small;
  margin-top: 5px;
  color: #de4f54;
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

const SocialLoginContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    margin-left: 0;
  }
`;

const GoogleLogin = styled.a`
  width: 320px;
  margin-bottom: 10px;
  height: max-content;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  padding: 3px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
const SocialLoginIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: 0;
`;

const SocialLoginText = styled.p`
  margin: 0;
  font-size: 15px;
  text-align: center;
  padding-top: 5px;
`;

//30분 지나면 세션스토리지 자동으로 날아가게..?

const Login = () => {
  const navigate = useNavigate();
  const usernameInput = useRef();
  const passwordInput = useRef();

  const { inputs, setInputs } = useInputStore((state) => state);
  const { errorMessage, setErrorMessage } = useErrorMessageStore();
  const { isLogin, setIsLogin } = useIsLoginStore((state) => state);
  const { userInfo, setUserInfo } = useUserInfoStore();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginHandler = () => {
    axios.defaults.withCredentials = true;

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    if (!username || !password) {
      setUsername("");
      setPassword("");
      setErrorMessage("Email or password cannot be empty.");
      return;
    } else {
      setErrorMessage("");
    }

    return axios
      .post(`${process.env.REACT_APP_SERVER_URI}users/login`, { username, password }, { headers })
      .then((response) => {
        const accessToken = response.headers.get("Authorization").split(" ")[1];
        sessionStorage.setItem("accesstoken", accessToken);
        // axios.defaults.headers.common["Authorization"] = sessionStorage.getItem("accesstoken");
        sessionStorage.setItem("userInfoStorage", JSON.stringify(response.data.data));
        setIsLogin(true);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setErrorMessage("The email or password is incorrect.");
          setUsername("");
          setPassword("");
        }
      });
  };

  return (
    <>
      <Header />
      <Background>
        <Container>
          <img
            src={Logo}
            css={`
              margin-bottom: 30px;
            `}
          />
          <SocialLoginContainer>
            <GoogleLogin href={`${process.env.REACT_APP_SERVER_URI}oauth2/authorization/google`}>
              <SocialLoginIcon src={Google} />
              <SocialLoginText>Login with Google</SocialLoginText>
            </GoogleLogin>
          </SocialLoginContainer>
          <LoginFormContainer>
            <LoginForm>
              <LoginInputContainer>
                <LoginLabel>Email</LoginLabel>
                <LoginInputInnerContainer>
                  {errorMessage ? (
                    <img
                      src={AlertCircle}
                      css={`
                        position: absolute;
                        right: 0;
                        margin-right: 10px;
                      `}
                    />
                  ) : null}
                  <LoginInput
                    className={errorMessage ? "error" : null}
                    name="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </LoginInputInnerContainer>
                <ErrorMessage>{errorMessage}</ErrorMessage>
              </LoginInputContainer>
              <LoginInputContainer>
                <LoginLabel>Password</LoginLabel>
                <LoginInputInnerContainer>
                  {errorMessage ? (
                    <img
                      src={AlertCircle}
                      css={`
                        position: absolute;
                        right: 0;
                        margin-right: 10px;
                      `}
                    />
                  ) : null}
                  <LoginInput
                    className={errorMessage ? "error" : null}
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </LoginInputInnerContainer>
              </LoginInputContainer>
              <LoginButton onClick={loginHandler}>Log in</LoginButton>
            </LoginForm>
            <p
              css={`
                font-size: small;
                margin-top: 30px;
              `}
            >
              Don’t have an account?
              <Linker
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </Linker>
            </p>
          </LoginFormContainer>
        </Container>
      </Background>
    </>
  );
};

export default Login;
