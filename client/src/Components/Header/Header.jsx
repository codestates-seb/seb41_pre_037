import styled from "styled-components/macro";
import SearchBarIcon from "../../icons/Search.svg";
import Logo from "../../icons/Logo.svg";
import MobileLogo from "../../icons/LogoGlyphXSm.svg";
import MobileMenuIcon from "../../icons/Hamburger.svg";
import MobileSearchBarIcon from "../../icons/MobileSearch.svg";
import DummyProfileIcon from "../../icons/DummyProfileIcon.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const BREAKPOINTMOBILE = 767;
const BREAKPOINTTABLET = 1023;

const AllContainer = styled.div`
  height: 30vh;
  width: 100vw;
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: column;
  left: 0;
  top: 0;
  background-color: coral;
`;

const HeaderComponent = styled.header`
  height: 50px;
  width: 100%;
  display: flex;
  position: fixed;
  align-items: center;
  box-sizing: border-box;
  left: 0;
  top: 0;
  background-color: rgb(248, 249, 249);
  border-top: 3px solid rgb(230, 135, 62);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05),
    0 2px 8px rgba(0, 0, 0, 0.05);

  @media screen and (max-width: ${BREAKPOINTMOBILE}px) {
    padding-right: 5%;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media screen and (max-width: ${BREAKPOINTMOBILE}px) {
    justify-content: space-between;
  }
`;

const ButtonArea = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeButton = styled.button`
  all: unset;
  width: 166px;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;

  &:hover {
    background-color: rgb(228, 230, 232);
  }
  @media screen and (max-width: ${BREAKPOINTMOBILE}px) {
    display: none;
  }
`;

const MobileLeftButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  @media screen and (min-width: ${BREAKPOINTMOBILE}px) {
    display: none;
  }
`;

const MobileHomeButton = styled.button`
  all: unset;
  height: 47px;
  width: 47px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgb(228, 230, 232);
  }
  @media screen and (min-width: ${BREAKPOINTMOBILE}px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  all: unset;
  height: 47px;
  width: 47px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgb(228, 230, 232);
  }
  @media screen and (min-width: ${BREAKPOINTMOBILE}px) {
    display: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(187, 191, 195);
  border-radius: 3px;
  width: 40%;
  height: 32px;
  padding-left: 1%;
  box-sizing: border-box;

  @media screen and (max-width: ${BREAKPOINTMOBILE}px) {
    display: none;
  }
`;

const SearchBarInput = styled.input`
  all: unset;
  padding-left: 1%;
  font-size: 14px;
`;

const SearchPopUp = styled.div`
  width: 40%;
  height: 200px;
  margin-top: 55px;
  position: fixed;
  background-color: blueviolet;
`;

const ScrollTestAria = styled.div`
  width: 100%;
  height: 5000px;
  background-color: #909cca;
`;

const MobileSearchBarIconArea = styled.div`
  display: flex;
  align-items: center;

  @media screen and (min-width: ${BREAKPOINTMOBILE}px) {
    display: none;
  }
`;

const LoggedOutButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  padding: 10px;

  @media screen and (min-width: ${BREAKPOINTMOBILE}px) {
  }
`;

const LoginOutButton = styled.button`
  all: unset;
  width: 60px;
  height: 32px;
  background-color: rgb(225, 236, 244);
  box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3);
  border: 1px solid rgb(57, 115, 157);
  border-radius: 3px;
  color: rgb(57, 115, 157);
  font-size: 14px;
  font-weight: 400;
  text-align: center;

  &:hover {
    background-color: rgb(185, 210, 232);
  }
`;

const SignUPButton = styled(LoginOutButton)`
  background-color: rgb(10, 149, 255);
  width: 65px;
  color: rgb(255, 255, 255);

  &:hover {
    background-color: rgb(49, 114, 198);
  }
`;

const LoggedInButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  padding: 10px;

  @media screen and (min-width: ${BREAKPOINTMOBILE}px) {
  }
`;

const ProfileButtonAria = styled.div`
  height: 47px;
  width: 47px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgb(228, 230, 232);
  }
`;

const Header = () => {
  const [popUp, setPopUp] = useState(false);

  const handleSearchPopUp = () => {
    setPopUp(!popUp);
    console.log(popUp);
  };

  return (
    <>
      <HeaderComponent>
        <HeaderContainer>
          <MobileLeftButtonContainer>
            <MobileMenuButton>
              <img src={MobileMenuIcon} />
            </MobileMenuButton>
            <MobileHomeButton>
              <img src={MobileLogo} />
            </MobileHomeButton>
          </MobileLeftButtonContainer>
          <ButtonArea>
            <HomeButton>
              <img src={Logo} />
            </HomeButton>
          </ButtonArea>
          <SearchBar>
            <img src={SearchBarIcon} />
            <SearchBarInput
              placeholder="Search..."
              onFocus={handleSearchPopUp}
            />
          </SearchBar>
          <ButtonArea>
            {/* <LoggedOutButtonContainer>
            <MobileSearchBarIconArea>
              <img src={MobileSearchBarIcon} />
            </MobileSearchBarIconArea>
            <Link to="/login">
              <LoginOutButton>Log in</LoginOutButton>
            </Link>
            <Link to="/signup">
              <SignUPButton>Sign up</SignUPButton>
            </Link>
          </LoggedOutButtonContainer> */}
            <LoggedInButtonContainer>
              <MobileSearchBarIconArea>
                <img src={MobileSearchBarIcon} />
              </MobileSearchBarIconArea>
              <ProfileButtonAria>
                <button
                  css={`
                    all: unset;
                    width: 24px;
                    height: 24px;
                  `}
                >
                  <img src={DummyProfileIcon} />
                </button>
              </ProfileButtonAria>
              <LoginOutButton>Log out</LoginOutButton>
            </LoggedInButtonContainer>
          </ButtonArea>
        </HeaderContainer>
      </HeaderComponent>
      <SearchPopUp>심란..</SearchPopUp>
      <ScrollTestAria>왜 안 보임..</ScrollTestAria>
    </>
  );
};

export default Header;
