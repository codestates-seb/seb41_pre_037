import styled from "styled-components/macro";
import { useMobileSearchPopUpStore } from "../../store/store";
import SearchBarIcon from "../../icons/Search.svg";

const SearchPopUpBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(187, 191, 195);
  border-radius: 3px;
  width: 90vw;
  height: 32px;
  margin-top: 60px;
  padding-left: 1%;
  box-sizing: border-box;

  &.input-actived {
    box-shadow: 0 0 5px 4px rgba(95, 180, 255, 0.4);
  }
`;

const SearchBarInput = styled.input`
  all: unset;
  padding-left: 1%;
  font-size: 14px;
`;

const SearchPopUpView = styled.div`
  border-radius: 3px;
  background-color: #ffffff;
  height: 100px;
  width: 90vw;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.2);
`;

const SearchType = styled.span`
  text-align: left;
  font-size: medium;
  font-weight: 500;
  margin-left: 5px;
`;

const SearchDescription = styled.span`
  text-align: left;
  font-size: small;
  margin-left: 5px;
`;

const SearchPopUpTextContainer = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
`;

const SearchPopUpInnerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
`;

const Button = styled.button`
  all: unset;
  width: 100px;
  height: 25px;
  background-color: rgb(225, 236, 244);
  box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3);
  border: 1px solid rgb(57, 115, 157);
  border-radius: 3px;
  color: rgb(57, 115, 157);
  font-size: small;
  font-weight: 400;
  text-align: center;

  margin-left: 2%;

  &:hover {
    background-color: rgb(185, 210, 232);
  }
`;

const MobileSearchPopUp = () => {
  const { showMobilePopUp, handleMobilePopUp } = useMobileSearchPopUpStore((state) => state);
  return (
    <>
      {showMobilePopUp === true ? (
        <SearchPopUpBackdrop onClick={handleMobilePopUp}>
          <SearchBar className={showMobilePopUp ? "input-actived" : null} onClick={(e) => e.stopPropagation()}>
            <img src={SearchBarIcon} />
            <SearchBarInput placeholder="Search..." onClick={(e) => e.stopPropagation()} />
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
              <Button>Ask a question</Button>
            </SearchPopUpInnerContainer>
          </SearchPopUpView>
        </SearchPopUpBackdrop>
      ) : null}
    </>
  );
};

export default MobileSearchPopUp;
