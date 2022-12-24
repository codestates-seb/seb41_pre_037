import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import { useMobileSearchPopUpStore } from "../../store/store";
import SearchBarIcon from "../../icons/Search.svg";
import SearchPopUp from "./SearchPopUp";
import SearchPopUpComponent from "./SearchPopUpComponent";

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
  width: 90vw;
  height: 100px;
  margin-top: 10px;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.2);
`;

const MobileSearchPopUpView = styled(SearchPopUpComponent)``;

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
          <MobileSearchPopUpView onClick={(e) => e.stopPropagation()} />
          {/* <SearchPopUpView onClick={(e) => e.stopPropagation()}>
            <span>user:1234</span> <span>search by author</span> <span> answers:0</span>{" "}
            <span>unanswered questions</span>
          </SearchPopUpView> */}
        </SearchPopUpBackdrop>
      ) : null}
    </>
  );
};

export default MobileSearchPopUp;
