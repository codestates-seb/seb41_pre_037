import styled from "styled-components/macro";
import { useSearchPopUpStore } from "../../store/store";
import SearchPopUpComponent from "./SearchPopUpComponent";

const SearchPopUpBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const SearchPopUp = () => {
  const { showPopUp, handlePopUp } = useSearchPopUpStore((state) => state);
  return (
    <>
      {showPopUp === true ? (
        <SearchPopUpBackdrop onClick={handlePopUp}>
          <SearchPopUpComponent />
        </SearchPopUpBackdrop>
      ) : null}
    </>
  );
};

export default SearchPopUp;
