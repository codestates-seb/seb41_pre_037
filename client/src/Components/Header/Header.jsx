import styled from "styled-components";
import SearchBarIconSVG from "../../icons/Search.svg";
import Logo from "../../icons/Logo.svg";

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
  justify-content: center;
`;

const HomeButton = styled.button`
  all: unset;
  width: 166px;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(187, 191, 195);
  border-radius: 3px;
  width: 45%;
  height: 33px;
  padding-left: 1%;
  margin: 0 5% 0 5%;
`;

const SearchBarInput = styled.input`
  all: unset;
  padding-left: 1%;
  font-size: 14px;
`;

const ButtonContainer = styled.div``;

const LoginOutButton = styled.button`
  all: unset;
  width: 60px;
  height: 33px;
  background-color: rgb(225, 236, 244);
  box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3);
  border: 1px solid rgb(57, 115, 157);
  border-radius: 3px;
  color: rgb(57, 115, 157);
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  margin-right: 4px;
`;

const SignUPButton = styled(LoginOutButton)`
  background-color: rgb(10, 149, 255);
  width: 65px;
  color: rgb(255, 255, 255);
`;
//얘만 파랑

const Header = () => {
  return (
    <>
      <HeaderComponent>
        <HeaderContainer>
          <HomeButton>
            <img src={Logo} />
          </HomeButton>
          <SearchBar>
            <img src={SearchBarIconSVG} />
            <SearchBarInput placeholder="Search..." />
          </SearchBar>
          <ButtonContainer>
            <LoginOutButton>Log in</LoginOutButton>
            <SignUPButton>Sign up</SignUPButton>
          </ButtonContainer>
        </HeaderContainer>
      </HeaderComponent>
    </>
  );
};

export default Header;
