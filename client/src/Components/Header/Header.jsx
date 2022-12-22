import styled from "styled-components/macro";
import SearchBarIcon from "../../icons/Search.svg";
import Logo from "../../icons/Logo.svg";
import MobileLogo from "../../icons/LogoGlyphXSm.svg";
import MobileMenuIcon from "../../icons/Hamburger.svg";
import MobileSearchBarIcon from "../../icons/MobileSearch.svg";
import DummyProfileIcon from "../../icons/DummyProfileIcon.png";
import { Link } from "react-router-dom";

const BREAKPOINTMOBILE = 767;
const BREAKPOINTTABLET = 1023;

const HeaderComponent = styled.header`
  height: 50px;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  left: 0;
  top: 0;
  background-color: rgb(248, 249, 249);
  border-top: 3px solid rgb(230, 135, 62);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05),
    0 2px 8px rgba(0, 0, 0, 0.05);
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

const HomeButton = styled.button`
  all: unset;
  width: 166px;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  /* margin-left: 5%; */

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
  width: 45%;
  height: 32px;
  padding-left: 1%;
  /* margin: 0 5% 0 5%; */

  @media screen and (max-width: ${BREAKPOINTMOBILE}px) {
    display: none;
  }
`;

const SearchBarInput = styled.input`
  all: unset;
  padding-left: 1%;
  font-size: 14px;
`;

const MobileSearchBarIconArea = styled.div`
  /* margin-right: 10px; */
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

  /* margin-right: 1%; */
  padding: 10px;

  @media screen and (min-width: ${BREAKPOINTMOBILE}px) {
    /* margin-right: 5%; */
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
  /* margin-right: 4px; */

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

  /* margin-right: 1%; */
  padding: 10px;

  @media screen and (min-width: ${BREAKPOINTMOBILE}px) {
    /* margin-right: 5%; */
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
          <HomeButton>
            <img src={Logo} />
          </HomeButton>
          <SearchBar>
            <img src={SearchBarIcon} />
            <SearchBarInput placeholder="Search..." />
          </SearchBar>
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
        </HeaderContainer>
      </HeaderComponent>
    </>
  );
};

export default Header;
