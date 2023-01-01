import SearchBarIcon from "../../icons/Search.svg";
import { useMobileSearchPopUpStore } from "../../store/store";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components/macro";

const SearchPopUpBackdrop = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
`;

const SearchBar = styled.div`
  align-items: center;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(187, 191, 195);
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  height: 32px;
  margin-top: 60px;
  padding-left: 1%;
  width: 90vw;

  &.input-actived {
    box-shadow: 0 0 5px 4px rgba(95, 180, 255, 0.4);
  }
`;

const SearchBarInput = styled.input`
  all: unset;
  font-size: 14px;
  padding-left: 1%;
`;

const SearchPopUpView = styled.div`
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 100px;
  margin-top: 10px;
  width: 90vw;
`;

const SearchType = styled.span`
  font-size: medium;
  font-weight: 500;
  margin-left: 5px;
  text-align: left;
`;

const SearchDescription = styled.span`
  font-size: small;
  margin-left: 5px;
  text-align: left;
`;

const SearchPopUpTextContainer = styled.div`
  align-items: center;
  display: flex;
  width: 50%;
`;

const SearchPopUpInnerContainer = styled.div`
  align-items: center;
  display: flex;
  height: 50%;
  width: 100%;
`;

const Button = styled.button`
  all: unset;
  background-color: rgb(225, 236, 244);
  box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3);
  border: 1px solid rgb(57, 115, 157);
  border-radius: 3px;
  color: rgb(57, 115, 157);
  font-size: small;
  font-weight: 400;
  height: 25px;
  margin-left: 2%;
  text-align: center;
  width: 100px;

  &:hover {
    background-color: rgb(185, 210, 232);
  }
`;

const MobileSearchPopUp = () => {
  const { showMobilePopUp, handleMobilePopUp } = useMobileSearchPopUpStore((state) => state);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation;

  const searchBarInputKeyUpHandler = (e) => {
    if (e.key === "Enter") {
      if (pathname === "/search") {
        navigate(`/search?q=${searchInput}`);
        setSearchInput(searchInput);
      } else {
        navigate(`./search?q=${searchInput}`);
        setSearchInput(searchInput);
      }
    }
  };

  return (
    <>
      {showMobilePopUp === true ? (
        <SearchPopUpBackdrop onClick={handleMobilePopUp}>
          <SearchBar className={showMobilePopUp ? "input-actived" : null} onClick={(e) => e.stopPropagation()}>
            <img src={SearchBarIcon} alt="searchbar icon" />
            <SearchBarInput
              placeholder="Search..."
              onClick={(e) => e.stopPropagation()}
              value={searchInput || ""}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyUp={searchBarInputKeyUpHandler}
            />
          </SearchBar>
          <SearchPopUpView>
            <SearchPopUpInnerContainer
              css={`
                border-bottom: 1px solid rgb(215, 215, 215);
              `}
            >
              <SearchPopUpTextContainer>
                <SearchType>user:1234</SearchType> <SearchDescription>search by author</SearchDescription>
              </SearchPopUpTextContainer>
              <SearchPopUpTextContainer>
                <SearchType> answers:0</SearchType> <SearchDescription>unanswered questions</SearchDescription>
              </SearchPopUpTextContainer>
            </SearchPopUpInnerContainer>
            <SearchPopUpInnerContainer>
              <Button
                onClick={() => {
                  navigate("/askquestions");
                }}
              >
                Ask a question
              </Button>
            </SearchPopUpInnerContainer>
          </SearchPopUpView>
        </SearchPopUpBackdrop>
      ) : null}
    </>
  );
};

export default MobileSearchPopUp;
