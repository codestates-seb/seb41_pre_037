import styled from "styled-components/macro";
import SearchBarIcon from "../../icons/Search.svg";
import Logo from "../../icons/Logo.svg";
import MobileLogo from "../../icons/LogoGlyphXSm.svg";
import MobileMenuIcon from "../../icons/Hamburger.svg";
import MobileSearchBarIcon from "../../icons/MobileSearch.svg";
import DummyProfileIcon from "../../icons/DummyProfileIcon.png";
import { useLeftNavStore, useSearchPopUpStore, useMobileSearchPopUpStore } from "../../store/store";
import { useIsLoginStore, useUserInfoStore } from "../../store/loginstore";
import BREAKPOINT from "../../breakpoint";
import SearchPopUp from "./SearchPopUp";
import MobileLeftNav from "./MobileLeftNav";
import MobileSearchPopUp from "./MobileSearchBarAndPopUp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeaderComponent = styled.header`
  height: 50px;
  width: 100vw;
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  align-items: center;
  box-sizing: border-box;
  background-color: rgb(248, 249, 249);
  border-top: 3px solid RGB(244, 130, 36);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 999;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    padding-right: 4%;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    justify-content: space-between;
  }
`;

const ButtonArea = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > button {
    cursor: pointer;
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: auto;
  }
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
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    display: none;
  }
`;

const MobileLeftButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  > button {
    cursor: pointer;
  }

  @media screen and (min-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
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
  @media screen and (min-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
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
  @media screen and (min-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
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

  &.input-actived {
    box-shadow: 0 0 5px 4px rgba(95, 180, 255, 0.4);
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    display: none;
  }
`;

const SearchBarInput = styled.input`
  all: unset;
  padding-left: 1%;
  font-size: 14px;
`;

const MobileSearchBarButton = styled.button`
  all: unset;
  height: 47px;
  width: 47px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgb(228, 230, 232);
  }
  @media screen and (min-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    display: none;
  }
`;

const LoggedOutButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px;

  > button {
    cursor: pointer;
  }

  @media screen and (min-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
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

const SignUpButton = styled(LoginOutButton)`
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

  > button {
    cursor: pointer;
  }

  @media screen and (min-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
  }
`;

const ProfileButtonAria = styled.div`
  height: 47px;
  width: 47px;

  display: flex;
  align-items: center;
  justify-content: center;

  > button {
    cursor: pointer;
  }

  &:hover {
    background-color: rgb(228, 230, 232);
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { showPopUp, handlePopUp } = useSearchPopUpStore((state) => state);
  const { handleLeftNav } = useLeftNavStore((state) => state);
  const { showMobilePopUp, handleMobilePopUp } = useMobileSearchPopUpStore((state) => state);
  const { isLogin, setIsLogin } = useIsLoginStore((state) => state);
  const { userInfo, setUserInfo } = useUserInfoStore();

  const logoutHandler = () => {
    return axios
      .post(`${process.env.REACT_APP_SERVER_URI}/users/logout`)
      .then((res) => {
        setUserInfo(null);
        setIsLogin(false);
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <HeaderComponent>
        <HeaderContainer>
          <MobileLeftButtonContainer>
            <MobileMenuButton onClick={handleLeftNav}>
              <img src={MobileMenuIcon} />
            </MobileMenuButton>
            <MobileHomeButton onClick={() => navigate("/")}>
              <img src={MobileLogo} />
            </MobileHomeButton>
          </MobileLeftButtonContainer>
          <ButtonArea>
            <HomeButton onClick={() => navigate("/")}>
              <img src={Logo} />
            </HomeButton>
          </ButtonArea>
          <SearchBar className={showPopUp ? "input-actived" : null}>
            <img src={SearchBarIcon} />
            <SearchBarInput placeholder="Search..." onFocus={handlePopUp} />
          </SearchBar>
          <SearchPopUp />
          <ButtonArea>
            {isLogin ? (
              <LoggedInButtonContainer>
                <MobileSearchBarButton onClick={handleMobilePopUp}>
                  <img src={MobileSearchBarIcon} />
                </MobileSearchBarButton>
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
            ) : (
              <LoggedOutButtonContainer>
                <MobileSearchBarButton onClick={handleMobilePopUp}>
                  <img src={MobileSearchBarIcon} />
                </MobileSearchBarButton>
                <LoginOutButton
                  css={`
                    margin-right: 5px;
                  `}
                  onClick={() => navigate("/login")}
                >
                  Log in
                </LoginOutButton>
                <SignUpButton onClick={() => navigate("/signup")}>Sign up</SignUpButton>
              </LoggedOutButtonContainer>
            )}
          </ButtonArea>
        </HeaderContainer>
      </HeaderComponent>
      <MobileLeftNav />
      <MobileSearchPopUp />
    </>
  );
};

export default Header;
