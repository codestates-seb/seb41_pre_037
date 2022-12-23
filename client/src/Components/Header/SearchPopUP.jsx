import { useState } from "react";
import styled from "styled-components/macro";
import { useSearchPopUpStore } from "../../store/store";

const SearchPopUpBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const SearchPopUpView = styled.div`
  border-radius: 3px;
  background-color: #ffffff;
  width: 40vw;
  height: 100px;
  margin-top: 55px;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.2);
`;

const SearchPopUp = () => {
  const { showPopUp, handlePopUp } = useSearchPopUpStore((state) => state);
  return (
    <>
      {showPopUp === true ? (
        <SearchPopUpBackdrop onClick={handlePopUp}>
          <SearchPopUpView onClick={(e) => e.stopPropagation()}>
            <span>user:1234</span> <span>search by author</span>{" "}
            <span> answers:0</span> <span>unanswered questions</span>
          </SearchPopUpView>
        </SearchPopUpBackdrop>
      ) : null}
    </>
  );
};

export default SearchPopUp;

// 파일명 수정 (SearchPopUP => SearchPopUp)
